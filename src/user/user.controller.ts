import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Delete,
  Query,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/input/create.dto';
import { UserType } from './user.type';
import { FindAllUsersDto } from './dto/input/find-all.dto';
import { UpdateUserDto } from './dto/input/update.dto';
import { HashPasswordPipe } from './pipes/hash.pipe';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async createUserHandler(@Body(new HashPasswordPipe()) body: CreateUserDto) {
    const user = await this.userService.create(body);

    return user;
  }

  @Get()
  @ApiOkResponse({
    type: [UserType],
    description: 'All users have been found successfully',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async getAllUsersHandler(@Query() query: FindAllUsersDto) {
    const { page = 1, limit = 10 } = query;

    const users = await this.userService.findAll(page, limit);

    return users;
  }

  @Get(':userId')
  @ApiParam({
    name: 'userId',
    description: 'Id of the user',
  })
  @ApiOkResponse({
    type: UserType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async getUserHandler(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.findById(userId);

    return user;
  }

  @Put(':userId')
  @ApiProperty({
    description:
      'Update user data - it can be whether basic info or the passwordÏ',
  })
  @ApiParam({
    name: 'userId',
    description: 'Id of the user',
  })
  @ApiOkResponse({
    type: UserType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async updateUserHandler(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserDto,
  ) {
    const user = await this.userService.update(userId, body);

    return user;
  }

  @Delete(':userId')
  @ApiParam({
    name: 'userId',
    description: 'Id of the user',
  })
  @ApiOkResponse({
    type: UserType,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async deleteUserHandler(@Param('userId', ParseIntPipe) userId: number) {
    const user = await this.userService.deleteById(userId);

    return user;
  }
}
