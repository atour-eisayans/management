import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config as dbConfig } from './ormconfig';
import { RoleEntity } from 'src/role/role.entity';
import { PermissionEntity } from 'src/permission/permission.entity';
import { UserEntity } from 'src/user/user.entity';
import { PermissionRepository } from 'src/permission/permission.repository';

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
  ],
  exports: ['PermissionRepositoryInterface'],
})
export class DatabaseModule {}
