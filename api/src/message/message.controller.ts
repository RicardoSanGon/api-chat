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
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('v1/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Param() id: number,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    return this.messageService.create(createMessageDto, req);
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
