import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { PermissionRepositoryInterface } from './interfaces/permission.repository.interface';
import { PermissionMapper } from './permission.mapper';
import { DatabaseException } from '../exceptions/database.exception';
import { CreatePermissionDto } from './dto/input/create.dto';
import { UpdatePermissionDto } from './dto/input/update.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PermissionService {
  private readonly logger: Logger = new Logger('permission_service', {
    timestamp: true,
  });
  constructor(
    @Inject('PermissionRepositoryInterface')
    private permissionRepository: PermissionRepositoryInterface,
    private permissionMapper: PermissionMapper,
  ) {}

  async findAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const allUsers = await this.permissionRepository.findAll(offset, limit);
      return allUsers.map(this.permissionMapper.mapEntityToType);
    } catch (error: any) {
      this.logger.error(
        `error while finding all permissions. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async create(input: CreatePermissionDto) {
    try {
      const permissionEntity = await this.permissionRepository.create(input);
      const permission =
        this.permissionMapper.mapEntityToType(permissionEntity);
      return permission;
    } catch (error: any) {
      this.logger.error(
        `error while creating permission. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async findById(permissionId: number) {
    try {
      const permission = await this.permissionRepository.findById(permissionId);
      return permission;
    } catch (error: any) {
      this.logger.error(
        `error while finding a permission. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async deleteById(permissionId: number) {
    try {
      const permission = await this.permissionRepository.deleteById(
        permissionId,
      );

      if (!permission) {
        throw new NotFoundException('Permission not found');
      }

      return this.permissionMapper.mapEntityToType(permission);
    } catch (error: any) {
      this.logger.error(
        `error while finding a permission. error: ${JSON.stringify(error)}`,
      );
      throw error;
    }
  }

  async update(permissionId: number, input: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.findById(permissionId);

      if (!permission) {
        throw new NotFoundError('Permission not found');
      }

      const updatedEntity = await this.permissionRepository.update(
        permissionId,
        input,
      );

      return this.permissionMapper.mapEntityToType(updatedEntity);
    } catch (error: any) {
      this.logger.error(
        `error while finding a permission. error: ${JSON.stringify(error)}`,
      );
      if (error instanceof DatabaseException) {
        throw error;
      }
    }
  }
}
