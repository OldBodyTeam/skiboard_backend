import { Frame } from 'src/frame/frame.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  selected_fid: string;

  @Column()
  name: string;

  @ManyToOne(type => User, (user) => user.collections)
  owner: User;

  @OneToMany(type => Frame, (frame) => frame.collection)
  frames: Frame[];
}
