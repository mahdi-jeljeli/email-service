import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Create a similar DTO for updating
import { Logger } from '@nestjs/common';
import { Project } from 'src/db_entity/Project';
import { CreateProjectDto } from './dto/CreateProjectDto';
import { UpdateProjectDto } from './dto/UpdateProjectDto';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<any> {
   const existProject = await this.projectRepository.findOne({where : {name : createProjectDto.name }})
   if (existProject) {
    this.logger.error(`Error creating project: Project with name "${createProjectDto.name}" already exists`);
    throw new ConflictException(`Project with name "${createProjectDto.name}" already exists`);
  }
    const { name, senderEmail, status } = createProjectDto;
    const project = this.projectRepository.create({ name, senderEmail, status });
  
    try {
      await this.projectRepository.save(project);
      this.logger.log(`Project ${name} created`);
      return {message : "Project succesfuly created" , code : 1};
    } catch (error) {
      this.logger.error('Error creating project', error.stack);
      throw new InternalServerErrorException('Failed to create project');
    }
  }

  async findByName(name: string): Promise<Project> {
    try {
      const project = await this.projectRepository.findOne({ where: { name } });
      if (!project) {
        throw new NotFoundException(`Project with name "${name}" not found`);
      }
      return project;
    } catch (error) {
      this.logger.error('Error fetching project', error.stack);
      throw new InternalServerErrorException('Failed to fetch project');
    }
  }

  async updateProject(updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({where : {name : updateProjectDto.name}});
    if (!project) {
      throw new NotFoundException(`Project with name "${updateProjectDto.name}" not found`);
    }

    const { name, senderEmail, status } = updateProjectDto;
    project.name = name ?? project.name;
    project.senderEmail = senderEmail ?? project.senderEmail;
    project.status = status ?? project.status;

    try {
      await this.projectRepository.save(project);
      this.logger.log(`Project ${name} updated`);
      return project;
    } catch (error) {
      this.logger.error('Error updating project', error.stack);
      throw new InternalServerErrorException('Failed to update project');
    }
  }

  async deleteProject(id: string): Promise<void> {
    const result = await this.projectRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Project with id "${id}" not found`);
    }

    this.logger.log(`Project with id ${id} deleted`);
  }
}
