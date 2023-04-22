import { IsNotEmpty, IsString } from 'class-validator';
import { PermissionEntity } from '../../../permission/permission.entity';
import { ApiProperty } from '@nestjs/swagger';

type PermissionType = Pick<PermissionEntity, 'id'>;

export class CreateRoleDto {
  @ApiProperty({
    type: String,
    description: 'Title of the role',
    examples: ['admin', 'superuser', 'author'],
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Permissions of the role',
    required: true,
  })
  @IsNotEmpty()
  permissions: PermissionType[];
}
