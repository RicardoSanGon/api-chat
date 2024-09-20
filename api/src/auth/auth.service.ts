import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(authDto) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: authDto.email },
    });
    if (await bcrypt.compare(authDto.password, user.password)) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: jwtConstants.secret,
        }),
      };
    }
    throw new UnauthorizedException();
  }

  async profile(@Request() req) {
    return await this.userRepository.findOneOrFail({
      where: { id: req.user.sub },
    });
  }
}
