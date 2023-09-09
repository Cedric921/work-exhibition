import { UserEntity } from 'src/user/entities/user.entity';
import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, EditPasswordDTO } from './dto';
import { CreateUserDTO } from '../user/dto/user.dto';
import { GetUser } from './decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  register(@Body() dto: CreateUserDTO) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('password')
  editPassword(@Body() dto: EditPasswordDTO, @GetUser() user: UserEntity) {
    return this.authService.updatePassword(user.id, dto);
  }
}
