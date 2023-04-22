import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepositoryInterface } from './interfaces/role.repository.interface';
import { RoleMapper } from './role.mapper';
import { CreateRoleDto } from './dto/input/create.dto';
import { RoleType } from './role.type';
import { DatabaseException } from '../exceptions/database.exception';
import { UpdateRoleDto } from './dto/input/update.dto';
import { PermissionMapper } from '../permission/permission.mapper';
import { PermissionType } from '../permission/permission.type';

@Injectable()
export class RoleService {
  private readonly logger: Logger = new Logger('permission_service', {
    timestamp: true,
  });

  constructor(
    private readonly roleMapper: RoleMapper,
    private readonly permissionMapper: PermissionMapper,
    @Inject('RoleRepositoryInterface')
    private readonly roleRepository: RoleRepositoryInterface,
  ) {}

  async create(input: CreateRoleDto): Promise<RoleType> {
    try {
      const role = await this.roleRepository.create(input);

      return role;
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }

  async findById(roleId: number): Promise<RoleType | null> {
    try {
      const role = await this.roleRepository.findById(roleId);

      return role;
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }

  async findAll(page = 1, limit = 10): Promise<RoleType[]> {
    try {
      const offset = (page - 1) * limit;
      const roles = await this.roleRepository.findAll(offset, limit);

      return roles;
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }

  async deleteById(roleId: number): Promise<RoleType | null> {
    try {
      const role = await this.roleRepository.deleteById(roleId);

      return role;
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }

  async update(roleId: number, input: UpdateRoleDto): Promise<RoleType | null> {
    try {
      console.log({ input });
      const role = await this.roleRepository.findById(roleId);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const updatedProperties: CreateRoleDto = {
        title: input?.title ?? role.title,
        permissions:
          input?.permissions ??
          role.permissions.map((permission) =>
            this.permissionMapper.mapEntityToType(permission),
          ),
      };

      const updatedEntity = await this.roleRepository.update(
        roleId,
        updatedProperties,
      );

      return updatedEntity;
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }
}
