import { IsOptional, IsString } from 'class-validator';
import { PermissionType } from '../../../permission/permission.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'Title of the role',
    example: 'admin',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Permissions of the role',
    required: false,
  })
  @IsOptional()
  permissions?: PermissionType[];
}
