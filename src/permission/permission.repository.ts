import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { PermissionRepositoryInterface } from './interfaces/permission.repository.interface';
import { CreatePermissionDto } from './dto/input/create.dto';
import { DatabaseException } from '../exceptions/database.exception';

@Injectable()
export class PermissionRepository implements PermissionRepositoryInterface {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findAll(offset: number, limit: number): Promise<PermissionEntity[]> {
    try {
      const allPermissions = await this.permissionRepository.find({
        take: limit,
        skip: offset,
      });
      return allPermissions;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async create(input: CreatePermissionDto): Promise<PermissionEntity> {
    try {
      const permission = this.permissionRepository.create(input);

      const permissionEntity = await this.permissionRepository.save(permission);

      return permissionEntity;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async findById(permissionId: number): Promise<PermissionEntity | null> {
    try {
      const permission = await this.permissionRepository.findOneBy({
        id: permissionId,
      });

      return permission;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async deleteById(permissionId: number): Promise<PermissionEntity | null> {
    try {
      const permission = await this.permissionRepository.findOneByOrFail({
        id: permissionId,
      });

      await this.permissionRepository.delete(permissionId);

      return permission;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async update(
    permissionId: number,
    input: CreatePermissionDto,
  ): Promise<boolean> {
    try {
      await this.permissionRepository.update({ id: permissionId }, input);

      return true;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
