import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(dto: any) {
    // check if user does not exist
    // hash password
    // save user data
    //  generate accessToken
    // return user data
    return { message: 'account created ' };
  }

  async login(dto: any) {
    // check if user email exist
    // compare password or throw error
    // generate acccessToken
    // return user data
    return { message: 'logged in ' };
  }

  generateToken(userId: string) {
    // generate token with Jsonwebtoken ( for 6days)
    //  return token
    return '';
  }
}
