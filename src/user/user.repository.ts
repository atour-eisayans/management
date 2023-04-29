import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/input/create.dto';
import { DatabaseException } from 'src/exceptions/database.exception';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { UpdateUserDto } from './dto/input/update.dto';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(input: CreateUserDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(input);
      const UserEntity = await this.userRepository.save(user);

      return UserEntity;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async findById(userId: number): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      return user;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async findByIdentifier(identifier: string): Promise<UserEntity | null> {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('username = :username', { username: identifier })
        .orWhere('email = :email', { email: identifier })
        .getOne();

      return user ?? null;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async findAll(offset: number, limit: number): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({
        skip: offset,
        take: limit,
      });

      return users;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async deleteById(userId: number): Promise<UserEntity | null> {
    try {
      const userEntity = await this.userRepository
        .createQueryBuilder()
        .delete()
        .where('id = :userId', { userId })
        .returning('*')
        .execute();

      return userEntity.raw?.[0] ?? null;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async update(userId: number, input: UpdateUserDto): Promise<UserEntity> {
    try {
      const user = <Partial<UserEntity>>{
        ...input,
        id: userId,
      };
      await this.userRepository.save(user, { transaction: true });
      const result = await this.findById(userId);

      return result;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }
}
