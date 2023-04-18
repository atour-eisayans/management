import { IsOptional, IsString } from 'class-validator';
import { CreatePermissionDto } from './create.dto';

type UpdateDto = Partial<Pick<CreatePermissionDto, 'category' | 'operation'>>;

export class UpdatePermissionDto implements UpdateDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  operation?: string;
}
