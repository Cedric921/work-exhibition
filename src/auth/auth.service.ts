import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as argon from 'argon2';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { LoginDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(dto: CreateUserDTO) {
    // check if user does not exist
    const exist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (exist) throw new UnauthorizedException('user already exit');

    const hash = await argon.hash(dto.password);

    const user = await this.userRepository.create({
      ...dto,
      password: hash,
    });

    delete user.password;

    const token = await this.generateToken(user.id);

    return { message: 'account created ', data: { ...user, token } };
  }

  async login(dto: LoginDTO) {
    // check if user does not exist
    const exist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (!exist) throw new UnauthorizedException('auth error');

    const matched = await argon.verify(exist.password, dto.password);

    if (!matched) throw new UnauthorizedException('auth error');

    delete exist.password;

    const token = await this.generateToken(exist.id);

    return { message: 'logged in ', data: { ...exist, token } };
  }

  async generateToken(userId: string) {
    const payload = {
      sub: userId,
    };
    const jwt = await this.jwtService.sign(payload, { expiresIn: '6d' });
    return jwt;
  }
}
