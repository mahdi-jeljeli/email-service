import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from 'src/db_entity/statistics';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics]),ProjectModule],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports:[StatisticsService]
})
export class StatisticsModule {}
