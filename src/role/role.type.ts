import { PermissionType } from '../permission/permission.type';

interface IRoleConstruction {
  id?: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  permissions: PermissionType[];
}

export class RoleType {
  public readonly id?: number;
  public readonly title: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly permissions: PermissionType[];

  constructor({
    id,
    title,
    permissions,
    createdAt,
    updatedAt,
  }: IRoleConstruction) {
    this.id = id;
    this.title = title;
    this.updatedAt = updatedAt;
    this.createdAt = createdAt;
    this.permissions = permissions;
  }
}
