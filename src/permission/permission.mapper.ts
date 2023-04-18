import { Injectable } from '@nestjs/common';
import { PermissionEntity } from './permission.entity';
import { PermissionType } from './permission.type';

@Injectable()
export class PermissionMapper {
  mapEntityToType(input: PermissionEntity): PermissionType {
    const permission = new PermissionType({
      id: input.id,
      category: input.category,
      operation: input.operation,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    return permission;
  }
}
