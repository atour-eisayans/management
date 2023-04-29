import { RoleType } from '../role/role.type';
import { UserStatusEnum } from './enums/user-status.enum';

interface IUserConstruction {
  id: number;
  username: string;
  email: string;
  instagramUsername: string;
  createdAt?: Date;
  updatedAt?: Date;
  phone?: string;
  firstName?: string;
  lastName?: string;
  status: UserStatusEnum;
  image?: string;
  approved: boolean;
  role: RoleType;
}

export class UserType implements IUserConstruction {
  id: number;
  username: string;
  email: string;
  instagramUsername: string;
  createdAt?: Date;
  updatedAt?: Date;
  phone?: string;
  firstName?: string;
  lastName?: string;
  status: UserStatusEnum;
  image?: string;
  approved: boolean;
  role: RoleType;

  constructor(input: IUserConstruction) {
    this.id = input.id;
    this.username = input.username;
    this.email = input.email;
    this.instagramUsername = input.instagramUsername;
    this.phone = input.phone;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.status = input.status;
    this.image = input.image;
    this.approved = input.approved;
    this.role = input.role;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
