import { IsEmail } from 'class-validator';
import { Collection } from 'src/collection/collection.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({
    default: 'https://ski-music.oss-cn-beijing.aliyuncs.com/avatar/avatar.png',
  })
  avatar: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany((type) => Collection, (collection) => collection.owner)
  collections: Collection[];
}
