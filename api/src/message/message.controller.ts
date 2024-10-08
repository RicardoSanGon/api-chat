import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  create(
    createMessageDto: { content: string; receiver: number },
    senderUserId: number,
  ) {
    return this.messageService.create(createMessageDto, senderUserId);
  }

  @Get()
  findAll() {
    return this.messageService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get('my-messages')
  myMessages(@Request() req) {
    return this.messageService.myMessages(req);
  }
}
