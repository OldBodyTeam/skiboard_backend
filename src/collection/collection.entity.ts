import { FrameEntity } from 'src/frame/frame.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class CollectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Smiling Face' })
  name: string;

  @CreateDateColumn({ name: 'createAt' })
  createAt: string;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: string;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: string;

  @ManyToOne(() => UserEntity, (user) => user.collections, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: UserEntity;

  @OneToMany(() => FrameEntity, (frame) => frame.collection)
  frames: FrameEntity[];
}
