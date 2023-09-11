import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatedProjectDTO } from './dto/project.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { CloudinaryUploadFileService } from 'src/cloudinary-upload-file/cloudinary-upload-file.service';
import { AwsUploadFileService } from 'src/aws-upload-file/aws-upload-file.service';

@Controller('projects')
export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private readonly config: ConfigService,
    private readonly cloudinaryUpload: CloudinaryUploadFileService,
    private readonly awsUpload: AwsUploadFileService,
  ) {}

  @Get()
  getAllProjects(@Query('q') queryString: string) {
    return this.projectService.getProjectsData(queryString);
  }

  @Get(':id')
  getProjectDetails(@Param('id') id: string) {
    return this.projectService.getProjectDetails(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProject(@Body() dto: CreatedProjectDTO, @GetUser() user: UserEntity) {
    return this.projectService.createProject(user, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('files'))
  @Put('image/:id')
  async addProjectProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
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
    return this.projectService.addImage(uploadedFileURL, id);
  }
}
