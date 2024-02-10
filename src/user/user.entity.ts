import { IsEmail } from 'class-validator';
import { Collection } from 'src/collection/collection.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  avatar: string;

  @OneToMany(type => Collection, (collection) => collection.owner)
  collections: Collection[];
}
