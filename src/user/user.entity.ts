import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CollectionEntity } from 'src/collection/collection.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
// https://typeorm.io/entities
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'username', nullable: false })
  username: string;

  @Column({ name: 'email', nullable: false })
  @IsEmail()
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({
    default: 'https://ski-music.oss-cn-beijing.aliyuncs.com/avatar/avatar.png',
    name: 'avatar',
  })
  avatar: string;

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  @OneToMany(() => CollectionEntity, (collection) => collection.owner, {
    cascade: true,
    eager: true,
  })
  collections: CollectionEntity[];
}
