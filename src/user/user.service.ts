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
    try {
      const data = await this.userRepository.findOne({ where: { id: userId } });
      return { message: 'user data', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUserData(
    id: string,
    user: any,
  ): Promise<{ message: string; data: UserEntity }> {
    try {
      const data = await this.userRepository.preload({ id, ...user });
      await this.userRepository.save(data);
      return { message: 'user data updated', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
