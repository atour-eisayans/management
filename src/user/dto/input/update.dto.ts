import {
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { RoleEntity } from '../../../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';

type RoleType = Pick<RoleEntity, 'id'>;

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username of the client',
    required: false,
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: "Password of the client's dashboard",
    required: false,
  })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Instagram username of the client',
    required: false,
  })
  @IsString()
  @IsOptional()
  instagramUsername?: string;

  @ApiProperty({
    description: "Password of the client's instagram",
    required: false,
  })
  @IsString()
  @IsOptional()
  instagramPassword?: string;

  @ApiProperty({
    description: "Password of the client's instagram",
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsMobilePhone('am-AM')
  phone?: string;

  @ApiProperty({
    description: "Client's first name",
    required: false,
  })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: "Client's last name",
    required: false,
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: "URL of the client's image",
    required: false,
  })
  @IsString()
  @IsUrl()
  image?: string;

  @ApiProperty({
    description: "ID of the client's role represented in an object",
    required: false,
    example: JSON.stringify({ id: 1 }),
  })
  @IsOptional()
  role?: RoleType;
}
