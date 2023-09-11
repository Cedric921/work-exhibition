import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository, TypeORMError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as argon from 'argon2';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { LoginDTO } from './dto';
import { ConfigService } from '@nestjs/config';
import { EditPasswordDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: CreateUserDTO) {
    try {
      // check if user does not exist
      const exist = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (exist) throw new UnauthorizedException('user already exit');

      // hash password
      const hash = await argon.hash(dto.password);

      // save user
      const user = await this.userRepository.save({
        ...dto,
        password: hash,
      });

      delete user.password;

      // generate token
      const token = await this.generateToken(user.id);

      return { message: 'account created ', data: { ...user, token } };
    } catch (error) {}
  }

  async login(dto: LoginDTO) {
    try {
      // check if user does not exist
      const exist = await this.userRepository.findOneOrFail({
        where: { email: dto.email },
      });

      if (!exist) throw new UnauthorizedException('auth error.');

      // compare password
      const matched = await argon.verify(exist.password, dto.password);

      if (!matched) throw new UnauthorizedException('auth error');

      delete exist.password;

      // generate token
      const token = await this.generateToken(exist.id);

      return { message: 'logged in ', data: { ...exist, token } };
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new ForbiddenException(error.message);
      } else {
        throw new ForbiddenException('Auth error');
      }
    }
  }

  async updatePassword(userId: string, dto: EditPasswordDTO) {
    try {
      // get user with id
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) throw new ConflictException('user not exist ');

      // compare old password
      const matchedPasswords = await argon.verify(
        user?.password,
        dto.oldPassword,
      );
      if (!matchedPasswords)
        throw new ConflictException('old password dont matched');

      // compare new passworrd with confirm password
      if (dto.newPassword !== dto.confirmPassword)
        throw new ConflictException(
          'new password must match to confirm password',
        );

      // encrypt new password
      const hash = await argon.hash(dto.newPassword);
      user.password = hash;

      // save password
      this.userRepository.save(user);

      // return response
      return { message: 'password changed' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async generateToken(userId: string) {
    const payload = {
      sub: userId,
    };
    return await this.jwtService.sign(payload, {
      expiresIn: '6d',
      privateKey: this.config.get('JWT_SECRET'),
    });
  }
}
