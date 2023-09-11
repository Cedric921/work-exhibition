import { AwsUploadFileService } from 'src/aws-upload-file/aws-upload-file.service';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import {
  Post,
  UploadedFile,
  UploadedFiles,
  // UploadedFiles,
  UseGuards,
  UseInterceptors,
  // UseInterceptors,
} from '@nestjs/common/decorators';
import { GetUser } from 'src/auth/decorator';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { CloudinaryUploadFileService } from 'src/cloudinary-upload-file/cloudinary-upload-file.service';
// import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly awsUpload: AwsUploadFileService,
    private readonly config: ConfigService,
    private readonly cloudinaryUpload: CloudinaryUploadFileService,
  ) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getUserData(@Param('id') userId: string) {
    return this.userService.getUserData(userId);
  }

  // @Post()
  // createUser(@Body() dto: CreateUserDTO) {
  //   return this.userService.createUser(dto);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Put('avatar')
  @UseInterceptors(FileInterceptor('files'))
  async updateAvatar(
    @GetUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log({ file });
    let uploadedFileURL = '';
    const fileService = this.config.get('FILES_UPLOAD_SERVICE');
    if (fileService === 'AWS') {
      // upload image to aws s3 logic here
      const { Location } = await this.awsUpload.uploadFile(file);
      uploadedFileURL = Location;
    } else {
      // upload image to cloudinary here
      const { secure_url } = await this.cloudinaryUpload.upload(file);
      uploadedFileURL = secure_url;
    }
    return this.userService.updateAvatar(user.id, uploadedFileURL);
  }

  @Put(':id')
  updateUserData(@Param('id') id: string, @Body() dto: UpdateUserDTO) {
    return this.userService.updateUserData(id, dto);
  }
}
