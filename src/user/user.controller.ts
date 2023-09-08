import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
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

  @Put(':id')
  updateUserData(@Param('id') id: string, @Body() dto: any) {
    return this.userService.updateUserData(id, dto);
  }
}
