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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { FindAllPermissionsDTO } from './dto/input/find-all.dto';
import { CreatePermissionDto } from './dto/input/create.dto';
import { UpdatePermissionDto } from './dto/input/update.dto';
import { PermissionType } from './permission.type';

@ApiTags('Permission')
@Controller('api/permissions')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @ApiOkResponse({
    description: 'Permissions have been retrieved successfully',
    type: [PermissionType],
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async getAllPermissionsHandler(@Query() query: FindAllPermissionsDTO) {
    const { page = 1, limit = 20 } = query;
    console.log(query);
    return await this.permissionService.findAll(page, limit);
  }

  @Get(':permissionId')
  @ApiOkResponse({
    description: 'Permission has been retrieved successfully',
    type: PermissionType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiParam({
    name: 'permissionId',
    description: 'Id of the permission in database',
  })
  async getPermissionHandler(
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ) {
    const permission = await this.permissionService.findById(permissionId);

    return permission;
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Permission has been added successfully',
    type: PermissionType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async addPermissionHandler(@Body() body: CreatePermissionDto) {
    const permission = await this.permissionService.create(body);

    return permission;
  }

  @Put(':permissionId')
  @ApiOkResponse({
    description: 'Permission has been modified successfully',
    type: PermissionType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiParam({
    name: 'permissionId',
    description: 'Id of the permission in database',
  })
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
  @ApiOkResponse({
    description: 'Permission has been removed successfully',
    type: PermissionType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiParam({
    name: 'permissionId',
    description: 'Id of the permission in database',
  })
  async deletePermissionHandler(
    @Param('permissionId', ParseIntPipe) permissionid: number,
  ) {
    const removedPermission = await this.permissionService.deleteById(
      permissionid,
    );

    return removedPermission;
  }
}
