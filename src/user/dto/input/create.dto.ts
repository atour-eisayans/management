import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { RoleEntity } from '../../../role/role.entity';
import { ApiProperty } from '@nestjs/swagger';

type RoleType = Pick<RoleEntity, 'id'>;

export class CreateUserDto {
  @ApiProperty({
    description: 'Username of the client',
    nullable: false,
    required: true,
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'Email of the client',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Password of the dashboard',
    required: true,
    nullable: false,
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    description: 'Instagram username of the client',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  instagramUsername!: string;

  @ApiProperty({
    description: "Password of the client's instagram",
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  instagramPassword!: string;

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
    required: true,
    example: JSON.stringify({ id: 'number' }),
  })
  @IsNotEmpty()
  role!: RoleType;
}
