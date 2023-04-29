import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dbConfig } from './ormconfig';
import { RoleEntity } from '../role/role.entity';
import { PermissionEntity } from '../permission/permission.entity';
import { UserEntity } from '../user/user.entity';
import { PermissionRepository } from '../permission/permission.repository';
import { RoleRepository } from '../role/role.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([PermissionEntity, RoleEntity, UserEntity]),
  ],
  providers: [
    {
      provide: 'PermissionRepositoryInterface',
      useClass: PermissionRepository,
    },
    {
      provide: 'RoleRepositoryInterface',
      useClass: RoleRepository,
    },
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
  ],
  exports: [
    'PermissionRepositoryInterface',
    'RoleRepositoryInterface',
    'UserRepositoryInterface',
  ],
})
export class DatabaseModule {}
