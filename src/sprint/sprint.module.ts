import { ProjectModule } from './../project/project.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { SprintProviders } from './sprint.providers';

@Module({
  imports: [DatabaseModule, ProjectModule],
  controllers: [SprintController],
  providers: [SprintService, ...SprintProviders],
  exports: [SprintService]
})
export class SprintModule {}
