import { IsNumberString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllUsersDto {
  @ApiPropertyOptional({
    description: 'Count of the received roles',
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
