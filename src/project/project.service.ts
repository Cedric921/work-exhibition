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
        const res = await this.projectRepository
          .createQueryBuilder('project')
          .where(
            `
            project.title like :query OR 
            project.description like :query OR
            project.website like :query OR
            project.activityDomain like :query`,
            { query: `%${search}%` },
          )
          .innerJoinAndMapOne('user', 'user', 'user.id = project.userId')
          .getMany();

        // .find({
        //   where: {
        //     title: Like(`%${search}%`),
        //     description: Like(`%${search}%`),
        //     website: Like(`%${search}%`),
        //     activityDomain: Like(`%${search}%`),
        //   },
        //   relations: {
        //     user: true,
        //   },
        // });
        data = [...res];
      } else {
        const res2 = await this.projectRepository.find({
          relations: {
            user: true,
          },
        });
        data = [...res2];
      }
      return { message: 'all projects', data };
    } catch (error) {
      console.log(error);
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
