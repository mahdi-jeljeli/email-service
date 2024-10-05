import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/db_entity/Project';
import { Statistics } from 'src/db_entity/statistics';
import { ProjectService } from 'src/project/project.service';
import { Repository } from 'typeorm';


@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statisticsRepository: Repository<Statistics>,
    private readonly projectService: ProjectService,
  ) {}

  async createStatistics(project: Project, emailType: string): Promise<Statistics> {
    const stats = this.statisticsRepository.create({ emailType });
    stats.project = project
    return await this.statisticsRepository.save(stats);
  }

  async incrementSentCount(statisticsId: string): Promise<void> {
    await this.statisticsRepository.increment({ id: statisticsId }, 'sentCount', 1);
  }

  async incrementFailureCount(statisticsId: string): Promise<void> {
    await this.statisticsRepository.increment({ id: statisticsId }, 'failureCount', 1);
  }

  async getStatisticsByProjectName(projectName: string): Promise<Statistics[]> {
    // Trouver le projet en fonction de son nom
    const project = await this.projectService.findByName(projectName);
    
    if (!project) {
      throw new NotFoundException(`Project with name ${projectName} not found`);
    }

    // Rechercher les statistiques associées au projet
    return await this.statisticsRepository.find({ where: { project } });
  }
}
