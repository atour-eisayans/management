import { IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(255)
  category: string;

  @IsString()
  @MaxLength(255)
  operation: string;
}
