import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity('messages')
export class Message {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  content: string;

  @Column()
  sender: number;

  @Column()
  receiver: number;

  @Column()
  sent_at: Date;
}
