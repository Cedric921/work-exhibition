import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatedProjectDTO } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

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
}
