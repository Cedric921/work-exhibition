import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    try {
      const data = await this.userRepository.find();
      return { message: 'users list', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserData(userId: string) {
    return 'get user data + projects';
  }

  async updateUserData(userId: string, dto: any) {
    return 'user data updated';
  }
}
