import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';
import { MailService } from 'src/mail/mail.service';
import { Code } from 'mongodb';
import { CodeDto } from './dto/code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async login(authDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: authDto.email },
    });
    if (await bcrypt.compare(authDto.password, user.password)) {
      const payload = { sub: user.id, email: user.email };
      user.code = Math.floor(100000 + Math.random() * 900000);
      await this.userRepository.save(user);
      await this.mailService.sendVerificationEmail(user.email, user.code.toString());
    
      return {
        access_token: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
    throw new UnauthorizedException();
  }

  async verifyCode(email: string, codeDto: CodeDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: email },
    });

    if (user.code === Number(codeDto.code)) {
      const payload = { sub: user.id, email: user.email };
      const access_token = this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      });
      return {
        message: 'Login and verification successful',
        access_token,
      };
    }

    throw new UnauthorizedException('Incorrect verification code');
  }


  async profile(@Request() req) {
    return await this.userRepository.findOneOrFail({
      where: { id: req.user.sub },
    });
  }
}
