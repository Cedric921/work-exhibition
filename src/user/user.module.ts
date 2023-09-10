import { JwtStrategy } from './../auth/strategy/jwt.strategy';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AwsUploadFileModule } from 'src/aws-upload-file/aws-upload-file.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AwsUploadFileModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
