import { IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllPermissionsDTO {
  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  page?: number;
}
