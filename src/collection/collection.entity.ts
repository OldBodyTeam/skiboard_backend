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

  @Column({ type: 'longtext' })
  frameList: string;

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.collections, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: UserEntity;
}
