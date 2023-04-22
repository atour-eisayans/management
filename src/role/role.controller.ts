import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/input/create.dto';
import { RoleService } from './role.service';
import { RoleType } from './role.type';
import { FindAllRolesDto } from './dto/input/find-all.dto';
import { UpdateRoleDto } from './dto/input/update.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Role')
@Controller('api/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Role has been added successfully',
    type: RoleType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async addRoleHandler(@Body() body: CreateRoleDto) {
    const role = await this.roleService.create(body);

    return role;
  }

  @Get()
  @ApiOkResponse({
    description: 'Roles have been retrieved successfully',
    type: [RoleType],
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async getAllRolesHandler(@Query() query: FindAllRolesDto) {
    const { page = 1, limit = 10 } = query;
    const roles = await this.roleService.findAll(page, limit);

    return roles;
  }

  @Get(':roleId')
  @ApiOkResponse({
    description: 'Roles have been retrieved successfully',
    type: RoleType,
  })
  @ApiParam({ name: 'roleId', description: 'Id of the role in database' })
  async getRoleHandler(@Param('roleId', ParseIntPipe) roleId: number) {
    const role = await this.roleService.findById(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  @Put(':roleId')
  @ApiOkResponse({
    description: 'Role has been modified successfully',
    type: RoleType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiParam({ name: 'roleId', description: 'Id of the role in database' })
  async updateRoleHandler(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() body: UpdateRoleDto,
  ) {
    const updatedRole = await this.roleService.update(roleId, body);

    return updatedRole;
  }

  @Delete(':roleId')
  @ApiOkResponse({
    description: 'Role has been modified successfully',
    type: RoleType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiParam({ name: 'roleId', description: 'Id of the role in database' })
  async deleteRoleHandler(@Param('roleId', ParseIntPipe) roleId: number) {
    const role = await this.roleService.deleteById(roleId);

    return role;
  }
}
