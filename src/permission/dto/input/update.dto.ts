import { IsEnum, IsOptional } from 'class-validator';
import { CreatePermissionDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  CategoriesEnum,
  OperationsEnum,
} from '../../../enums/permissions.enum';

type UpdateDto = Partial<Pick<CreatePermissionDto, 'category' | 'operation'>>;

export class UpdatePermissionDto implements UpdateDto {
  @ApiProperty({
    type: CategoriesEnum,
    description: 'Category of the permission',
    examples: ['roles', 'users', 'customers'],
    enum: CategoriesEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(CategoriesEnum)
  category?: CategoriesEnum;

  @ApiProperty({
    type: OperationsEnum,
    description: 'What is the permission allowed to do',
    examples: ['read', 'write', 'delete'],
    enum: OperationsEnum,
    required: true,
  })
  @IsOptional()
  @IsEnum(OperationsEnum)
  operation?: OperationsEnum;
}
