import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email_name: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ username: email_name }, { email: email_name }],
    });
  }

  async create(newUser: User): Promise<User | null> {
    return this.usersRepository.create(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
