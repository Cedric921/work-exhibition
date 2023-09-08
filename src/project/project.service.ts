import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {}

  async getProjectsData(search?: string) {
    try {
      const data = await this.projectRepository.find({
        relations: {
          user: true,
        },
      });
      return { message: 'all projects', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getProjectDetails(projectId: string) {
    const data = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        user: true,
      },
    });
    try {
      return { message: 'project details', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createProject(userId: string, dto: any) {
    try {
      const data = await this.projectRepository.save(dto);
      return { message: 'project created', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
