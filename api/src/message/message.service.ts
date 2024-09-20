import { Injectable, Request } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { DateTime } from 'luxon';
@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message, 'MongoConnection')
    private messageRepository: Repository<Message>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createMessageDto: CreateMessageDto, @Request() req) {
    await this.userRepository.findOneOrFail({
      where: { id: createMessageDto.receiver },
    });
    return await this.messageRepository.save({
      content: createMessageDto.content,
      sender: req.user.sub,
      receiver: createMessageDto.receiver,
      sent_at: DateTime.now().toISO(),
    });
  }

  async findAll() {
    return await this.messageRepository.find();
  }

  async myMessages(@Request() req) {
    const messages = await this.messageRepository.find({
      where: { receiver: req.user.sub },
    });
    return messages;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
