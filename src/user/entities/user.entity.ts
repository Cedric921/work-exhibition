import { TimestampEntity } from 'src/config/global.entity';
import { ProjectEntity } from 'src/project/entity/project.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export abstract class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  biography?: string;

  @Column({ type: 'text' })
  tel: string;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @OneToMany((type) => ProjectEntity, (project) => project.user, {
    cascade: ['insert', 'update'],
  })
  projects: ProjectEntity[];
}
