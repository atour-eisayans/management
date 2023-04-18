import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { FindAllPermissionsDTO } from './dto/input/find-all.dto';
import { CreatePermissionDto } from './dto/input/create.dto';
import { UpdatePermissionDto } from './dto/input/update.dto';

@Controller('api/permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Get()
  async getAllPermissionsHandler(@Query() query: FindAllPermissionsDTO) {
    const { page = 1, limit = 20 } = query;
    console.log(query);
    return await this.permissionService.findAll(page, limit);
  }

  @Post()
  async addPermissionHandler(@Body() body: CreatePermissionDto) {
    const permission = await this.permissionService.create(body);

    return permission;
  }

  @Put(':permissionId')
  async updatePermissionHandler(
    @Param('permissionId', ParseIntPipe) permissionId: number,
    @Body() body: UpdatePermissionDto,
  ) {
    const updatedPermission = await this.permissionService.update(
      permissionId,
      body,
    );

    return updatedPermission;
  }

  @Delete(':permissionId')
  async deletePermissionHandler(
    @Param('permissionId', ParseIntPipe) permissionid: number,
  ) {
    const removedPermission = await this.permissionService.deleteById(
      permissionid,
    );

    return removedPermission;
  }
}
