import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PermissionController } from './permission/permission.controller';
import { PermissionService } from './permission/permission.service';
import { PermissionMapper } from './permission/permission.mapper';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionMapper],
})
export class AppModule {}
