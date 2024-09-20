import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from './constants';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '3600s' },
      secret: jwtConstants.secret,
    }),
    TypeOrmModule.forFeature([User]),
  ],
})
export class AuthModule {}
