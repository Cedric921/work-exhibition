import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  getAllProjects(@Query('q') queryString: string) {
    return this.projectService.getProjectsData(queryString);
  }

  @Get('/user:id')
  getUserProjects(@Param('id') userId: string) {
    return this.projectService.getUserProjects(userId);
  }

  @Get(':id')
  getProjectDetails(@Param('id') id: string) {
    return this.projectService.getProjectDetails(id);
  }

  @Post()
  createProject(@Body() dto: any) {
    return this.projectService.createProject('1', dto);
  }
}
