import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserType } from './user.type';

@Injectable()
export class UserMapper {
  mapEntityToType(entity: UserEntity): UserType {
    return <UserType>{
      id: entity.id,
      email: entity.email,
      username: entity.username,
      instagramUsername: entity.instagramUsername,
      phone: entity.phone,
      firstName: entity.firstName,
      lastName: entity.lastName,
      approved: entity.approved,
      role: entity.role,
      status: entity.status,
      image: entity.image,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
