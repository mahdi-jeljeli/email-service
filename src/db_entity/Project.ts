
import { IsEnum } from "class-validator";
import { ProjectStatus } from "src/project/dto/CreateProjectDto";
import { Entity, PrimaryGeneratedColumn, Column,Unique  } from "typeorm";

@Entity()
@Unique(['name']) 
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  senderEmail: string;

  @Column()
  @IsEnum(ProjectStatus, {
    message: 'Le statut doit être actif, inactif ou complété.',
  })
  status: ProjectStatus;
}
