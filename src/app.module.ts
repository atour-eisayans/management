import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { PermissionMapper } from './permission/permission.mapper';
import { RoleController } from './role/role.controller';
import { RoleMapper } from './role/role.mapper';
import { RoleService } from './role/role.service';
import { UserController } from './user/user.controller';
import { UserMapper } from './user/user.mapper';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [PermissionController, RoleController, UserController],
  providers: [
    PermissionService,
    PermissionMapper,
    RoleService,
    RoleMapper,
    UserService,
    UserMapper,
    AuthService,
  ],
})
export class AppModule {}
