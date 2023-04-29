import { Injectable } from '@nestjs/common';
import { RoleRepositoryInterface } from './interfaces/role.repository.interface';
import { CreateRoleDto } from './dto/input/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { Repository } from 'typeorm';
import { DatabaseException } from '../exceptions/database.exception';
import { UpdateRoleDto } from './dto/input/update.dto';

@Injectable()
export class RoleRepository implements RoleRepositoryInterface {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(input: CreateRoleDto): Promise<RoleEntity> {
    try {
      const role = this.roleRepository.create(input);
      const roleEntity = await this.roleRepository.save(role);

      return roleEntity;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }

  async findById(roleId: number): Promise<RoleEntity | null> {
    try {
      const roleEntity = await this.roleRepository.findOneBy({ id: roleId });

      return roleEntity;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }

  async findAll(offset: number, limit: number): Promise<RoleEntity[]> {
    try {
      const allRoles = await this.roleRepository.find({
        take: limit,
        skip: offset,
      });

      return allRoles;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }

  async deleteById(roleId: number): Promise<RoleEntity | null> {
    try {
      const roleEntity = await this.roleRepository
        .createQueryBuilder('roles')
        .delete()
        .where('id = :id', { id: roleId })
        .returning('roles.*')
        .execute();

      return roleEntity.raw?.[0] ?? null;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }

  async update(
    roleId: number,
    input: UpdateRoleDto,
  ): Promise<RoleEntity | null> {
    try {
      const role = <Partial<RoleEntity>>{
        ...input,
        id: roleId,
      };
      await this.roleRepository.save(role, { transaction: true });
      const result = await this.findById(roleId);

      return result ?? null;
    } catch (error: any) {
      throw new DatabaseException(error);
    }
  }
}
