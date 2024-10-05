import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  COMPLETED = 'completed',
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Le nom du projet est requis.' })
  name: string;

  @IsString()
  @IsOptional()
  senderEmail: string;

  @IsEnum(ProjectStatus, {
    message: 'Le statut doit être actif, inactif ou complété.',
  })
  status: ProjectStatus;

}
