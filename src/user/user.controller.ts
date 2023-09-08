import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { Post } from '@nestjs/common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserData(@Param('id') userId: string) {
    return this.userService.getUserData(userId);
  }

  @Post()
  createUser(@Body() dto: any) {
    return this.userService.createUser(dto);
  }

  @Put(':id')
  updateUserData(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return this.userService.updateUserData(id, dto);
  }
}
