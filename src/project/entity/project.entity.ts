import { TimestampEntity } from 'src/config/global.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'project' })
export abstract class ProjectEntity extends TimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  activityDomain: string;

  @Column({ type: 'text' })
  duration: string;

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ type: 'text' })
  budget: string;

  @Column({ type: 'json', nullable: true })
  collaborators?: string[];
}
