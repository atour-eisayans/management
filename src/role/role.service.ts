import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RoleRepositoryInterface } from './interfaces/role.repository.interface';
import { RoleMapper } from './role.mapper';
import { CreateRoleDto } from './dto/input/create.dto';
import { RoleType } from './role.type';
import { UpdateRoleDto } from './dto/input/update.dto';
import { PermissionMapper } from '../permission/permission.mapper';

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

      return this.roleMapper.mapEntityToType(role);
    } catch (error) {
      this.logger.error(
        `error while creating roles. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async findById(roleId: number): Promise<RoleType | null> {
    try {
      const role = await this.roleRepository.findById(roleId);

      return this.roleMapper.mapEntityToType(role);
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async findAll(page = 1, limit = 10): Promise<RoleType[]> {
    try {
      const offset = (page - 1) * limit;
      const roles = await this.roleRepository.findAll(offset, limit);

      return roles.map((role) => this.roleMapper.mapEntityToType(role));
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async deleteById(roleId: number): Promise<RoleType | null> {
    try {
      const role = await this.roleRepository.deleteById(roleId);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      return this.roleMapper.mapEntityToType(role);
    } catch (error) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async update(roleId: number, input: UpdateRoleDto): Promise<RoleType | null> {
    try {
      const role = await this.roleRepository.findById(roleId);

      if (!role) {
        throw new NotFoundException('Role not found');
      }

      const updatedEntity = await this.roleRepository.update(roleId, input);

      return updatedEntity;
    } catch (error) {
      this.logger.error(
        `error while updating role. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }
}
