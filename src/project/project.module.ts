import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/db_entity/Project';
import { LogService } from 'src/log/log.service';

@Module({
  imports:[TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService,LogService],
  exports :[ProjectService]
})
export class ProjectModule {}
