import { Frame } from 'src/frame/frame.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CollectionEntity {
  @PrimaryGeneratedColumn()
  id: string;

  // @Column({ type: 'json', nullable: true })
  // selected_fid: string[][];

  @Column({ default: 'Smiling Face' })
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.collections, { cascade: true })
  owner: User;

  @OneToMany(() => Frame, (frame) => frame.collection)
  frames: Frame[];
}
