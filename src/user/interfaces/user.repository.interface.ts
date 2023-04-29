import { CreateUserDto } from '../dto/input/create.dto';
import { UpdateUserDto } from '../dto/input/update.dto';
import { UserEntity } from '../user.entity';

export interface UserRepositoryInterface {
  create(input: CreateUserDto): Promise<UserEntity>;
  findById(userId: number): Promise<UserEntity | null>;
  findAll(offset: number, limit: number): Promise<UserEntity[]>;
  deleteById(userId: number): Promise<UserEntity>;
  update(userId: number, input: UpdateUserDto): Promise<UserEntity>;
  findByIdentifier(identifier: string): Promise<UserEntity | null>;
}
