import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';
import { CodeDto } from './dto/code.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

  @UseGuards(AuthGuard)
  @Post('verify-code')
  async verifyCode(@Request() req: Request, @Body() codeDto: CodeDto) {
    const email = req['user'].email;
    return this.authService.verifyCode(email, codeDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req);
  }
}
