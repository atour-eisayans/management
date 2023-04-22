import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, MaxLength } from 'class-validator';
import {
  CategoriesEnum,
  OperationsEnum,
} from '../../../enums/permissions.enum';

export class CreatePermissionDto {
  @ApiProperty({
    type: CategoriesEnum,
    description: 'Category of the permission',
    examples: ['roles', 'users', 'customers'],
    enum: CategoriesEnum,
    required: true,
  })
  @IsEnum(CategoriesEnum)
  @MaxLength(255)
  category: CategoriesEnum;

  @ApiProperty({
    type: OperationsEnum,
    description: 'What is the permission allowed to do',
    examples: ['read', 'write', 'delete'],
    enum: OperationsEnum,
    required: true,
  })
  @IsEnum(OperationsEnum)
  @MaxLength(255)
  operation: OperationsEnum;
}
