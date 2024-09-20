import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;
    return await this.userRepository.save(createUserDto);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneOrFail({ where: { email: email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepository.findOneOrFail({ where: { id: id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
