interface IPermissionConstruction {
  id?: number;
  category: string;
  operation: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class PermissionType implements IPermissionConstruction {
  public id?: number;
  public category: string;
  public operation: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor({
    id,
    category,
    operation,
    createdAt,
    updatedAt,
  }: IPermissionConstruction) {
    this.id = id;
    this.category = category;
    this.operation = operation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
