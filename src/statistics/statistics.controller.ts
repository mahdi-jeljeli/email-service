import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { Statistics } from 'src/db_entity/statistics';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Get(':projectName')
  @ApiOperation({ summary: 'Obtenir les statistiques pour un projet spécifique' })
  @ApiParam({ name: 'projectName', description: 'Nom du projet pour lequel récupérer les statistiques', example: 'Facture' })
  @ApiResponse({ status: 200, description: 'Statistiques récupérées avec succès.', type: [Statistics] })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @ApiResponse({ status: 500, description: 'Erreur interne du serveur.' })
  async getStatistics(@Param('projectName') projectName: string): Promise<Statistics[]> {
    return await this.statisticsService.getStatisticsByProjectName(projectName);
  }
}
