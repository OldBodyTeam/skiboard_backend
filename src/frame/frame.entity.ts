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

  // @CreateDateColumn({ name: 'createAt' })
  // createAt: string;

  // @UpdateDateColumn({ name: 'updateAt' })
  // updateAt: string;

  // @DeleteDateColumn({ name: 'deleteAt' })
  // deleteAt: string;

  // @ManyToOne(() => CollectionEntity, (collection) => collection.frames, {
  //   cascade: true,
  // })
  // collection: CollectionEntity;
}
