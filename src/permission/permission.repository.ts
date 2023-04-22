import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { PermissionRepositoryInterface } from './interfaces/permission.repository.interface';
import { CreatePermissionDto } from './dto/input/create.dto';
import { DatabaseException } from '../exceptions/database.exception';

@Injectable()
export class PermissionRepository implements PermissionRepositoryInterface {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
    private dataSource: DataSource,
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
      await this.permissionRepository.findOneByOrFail({
        id: permissionId,
      });

      const permissionEntity = await this.permissionRepository.delete({
        id: permissionId,
      });

      return permissionEntity.raw ?? null;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }

  async update(
    permissionId: number,
    input: CreatePermissionDto,
  ): Promise<PermissionEntity | null> {
    try {
      const result = await this.dataSource
        .createQueryBuilder()
        .update(PermissionEntity)
        .set({ category: input.category, operation: input.operation })
        .where('id = :permissionId', { permissionId })
        .returning('*')
        .execute();

      console.log({ result });

      return result.raw ? (result.raw as PermissionEntity) : null;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
