import { CreatePermissionDto } from '../dto/input/create.dto';
import { PermissionEntity } from '../permission.entity';

export interface PermissionRepositoryInterface {
  findAll(offset: number, limit: number): Promise<PermissionEntity[]>;
  create(input: CreatePermissionDto): Promise<PermissionEntity>;
  findById(permissionId: number): Promise<PermissionEntity | null>;
  deleteById(permissionId: number): Promise<PermissionEntity | null>;
  update(
    permissionId: number,
    input: CreatePermissionDto,
  ): Promise<PermissionEntity | null>;
}
