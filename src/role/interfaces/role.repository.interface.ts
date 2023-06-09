import { CreateRoleDto } from '../dto/input/create.dto';
import { UpdateRoleDto } from '../dto/input/update.dto';
import { RoleEntity } from '../role.entity';

export interface RoleRepositoryInterface {
  create(input: CreateRoleDto): Promise<RoleEntity>;
  findById(roleId: number): Promise<RoleEntity | null>;
  findAll(offset: number, limit: number): Promise<RoleEntity[]>;
  deleteById(roleId: number): Promise<RoleEntity | null>;
  update(roleId: number, input: UpdateRoleDto): Promise<RoleEntity | null>;
}
