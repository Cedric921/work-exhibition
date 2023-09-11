import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Like, Repository, SelectQueryBuilder } from 'typeorm';
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
      let data: ProjectEntity[] = [];
      if (search?.length > 1) {
        const res = await this.projectRepository.find({
          where: [
            { title: Like(`%${search}%`) },
            { description: Like(`%${search}%`) },
            { website: Like(`%${search}%`) },
            { activityDomain: Like(`%${search}%`) },
            { duration: Like(`%${search}%`) },
          ],
          relations: {
            user: true,
          },
        });
        data = [...res];
      } else {
        const res2 = await this.projectRepository.find({
          relations: {
            user: true,
          },
        });
        data = [...res2];
      }
      const res = data?.map((el) => ({
        ...el,
        imagesUrl: el.imagesUrl?.split('@@') ?? [],
      }));
      return { message: 'all projects', data: res };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getProjectDetails(
    projectId: string,
  ): Promise<{ message: string; data: any }> {
    const data = await this.projectRepository.findOne({
      where: { id: projectId },
      relations: {
        user: true,
      },
    });
    try {
      return {
        message: 'project details',
        data: { ...data, imagesUrl: data.imagesUrl?.split('@@') ?? [] },
      };
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

  async addImage(imageUrl: string, projectId: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id: projectId },
      });

      const images = project.imagesUrl?.split('@@') ?? [];

      project.imagesUrl = [...images, imageUrl].join('@@');

      await this.projectRepository.save(project);

      return {
        message: 'project image added',
        data: { ...project, imageUrl: project.imagesUrl.split('@@') },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
