import { IsArray, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreatedProjectDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  activityDomain: string;

  @IsString()
  duration: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  budget: string;

  @IsArray()
  collaborators?: string[];
}
