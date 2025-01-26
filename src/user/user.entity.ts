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
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: '用户名' })
  @Column({ name: 'username', nullable: false })
  username: string;

  @ApiProperty({ description: '用户邮箱' })
  @Column({ name: 'email', nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '用户密码' })
  @Column({ name: 'password', nullable: false })
  password: string;

  @ApiProperty({ description: '用户头像URL' })
  @Column({
    default: 'https://ski-music.oss-cn-beijing.aliyuncs.com/avatar/avatar.png',
    name: 'avatar',
  })
  avatar: string;

  @ApiProperty({ description: '创建时间' })
  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @ApiProperty({ description: '更新时间' })
  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @ApiProperty({ description: '删除时间' })
  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  @ApiProperty({ description: '用户收藏列表' })
  @OneToMany(() => CollectionEntity, (collection) => collection.owner, {
    cascade: true,
    eager: true,
  })
  collections: CollectionEntity[];
}
