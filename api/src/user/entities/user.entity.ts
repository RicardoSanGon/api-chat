import { Exclude } from 'class-transformer';
import { Message } from 'src/message/entities/message.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({nullable: true})
  code: number;

  @Column()
  @Exclude()
  password: string;
}
