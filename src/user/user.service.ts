import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/input/create.dto';
import { UserType } from './user.type';
import { UserMapper } from './user.mapper';
import { UpdateUserDto } from './dto/input/update.dto';

@Injectable()
export class UserService {
  logger: Logger = new Logger('user_service', { timestamp: true });

  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly userMapper: UserMapper,
  ) {}

  async create(input: CreateUserDto): Promise<UserType> {
    try {
      const userEntity = await this.userRepository.create(input);

      return this.userMapper.mapEntityToType(userEntity);
    } catch (error: any) {
      this.logger.error(
        `Error while creating user. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async findById(userId: number): Promise<UserType | null> {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.userMapper.mapEntityToType(user);
    } catch (error) {
      this.logger.error(
        `Error while finding user by id. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async findByIdentifier(identifier: string) {
    try {
      const user = await this.userRepository.findByIdentifier(identifier);

      return user;
    } catch (error) {
      this.logger.error(
        `Error while finding user by email or username. error: ${JSON.stringify(
          error,
        )}`,
      );
      throw error;
    }
  }

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await this.userRepository.findAll(skip, limit);

      return users.map((user) => this.userMapper.mapEntityToType(user));
    } catch (error) {
      this.logger.error(
        `Error while finding all users. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async deleteById(userId: number) {
    try {
      const user = await this.userRepository.deleteById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.userMapper.mapEntityToType(user);
    } catch (error) {
      this.logger.error(
        `Error while finding user by id. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async update(userId: number, input: UpdateUserDto) {
    try {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const updatedEntity = await this.userRepository.update(userId, input);

      return this.userMapper.mapEntityToType(updatedEntity);
    } catch (error) {
      this.logger.error(
        `Error while finding user by id. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}
