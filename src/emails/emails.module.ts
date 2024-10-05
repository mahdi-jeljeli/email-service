import { Module } from '@nestjs/common';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { StatisticsModule } from 'src/statistics/statistics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailLog } from 'src/db_entity/EmailLog ';
import { ProjectModule } from 'src/project/project.module';


@Module({
  imports : [TypeOrmModule.forFeature([EmailLog]) ,StatisticsModule ,ProjectModule],
  controllers: [EmailsController],
  providers: [EmailsService]
})
export class EmailsModule {}
