import { Collection } from 'src/collection/collection.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Frame {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'json', nullable: true })
  selected_fid: string[][];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => Collection, (collection) => collection.frames, {
    cascade: true,
  })
  collection: Collection;
}
