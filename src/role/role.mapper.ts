import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';
import { RoleType } from './role.type';
import { PermissionMapper } from '../permission/permission.mapper';

@Injectable()
export class RoleMapper {
  constructor(private readonly permissionMapper: PermissionMapper) {}

  mapEntityToType(entity: RoleEntity): RoleType {
    return <RoleType>{
      id: entity.id,
      title: entity.title,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      permissions: entity.permissions.map(
        this.permissionMapper.mapEntityToType,
      ),
    };
  }
}
