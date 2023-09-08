import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreatedProjectDTO } from './dto/project.dto';
import { UserEntity } from 'src/user/entities/user.entity';

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

  async createProject(user: UserEntity, dto: CreatedProjectDTO) {
    const collaborators = dto.collaborators?.map((el) => ({ name: el }));
    try {
      const data = await this.projectRepository.save({
        ...dto,
        collaborators: { names: collaborators },
        user,
      });
      return { message: 'project created', data };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
