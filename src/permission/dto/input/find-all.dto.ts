import { IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllPermissionsDTO {
  @ApiPropertyOptional({
    description: 'Count of the received permissions',
  })
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Page',
  })
  @IsNumberString()
  @IsOptional()
  page?: number;
}
