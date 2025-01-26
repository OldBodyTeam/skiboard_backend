// import { CollectionEntity } from 'src/collection/collection.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  // ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class FrameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'json', nullable: true, default: [] })
  selected_fid: number[];

  @CreateDateColumn({ name: 'createAt' })
  createAt: Date;

  @UpdateDateColumn({ name: 'updateAt' })
  updateAt: Date;

  @DeleteDateColumn({ name: 'deleteAt' })
  deleteAt: Date;

  // @ManyToOne(() => CollectionEntity, (collection) => collection.frames, {
  //   cascade: true,
  // })
  // collection: CollectionEntity;
}
