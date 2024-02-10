import { Collection } from 'src/collection/collection.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Frame {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Collection, (collection) => collection.frames)
  collection: Collection;
}
