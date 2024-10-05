import { IsString, IsEmail, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { ProjectStatus } from './CreateProjectDto';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  senderEmail?: string;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
