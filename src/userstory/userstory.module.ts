import { SprintModule } from './../sprint/sprint.module';
import { BacklogModule } from './../backlog/backlog.module';
import { HistoryModule } from './../history/history.module';
import { ProjectModule } from './../project/project.module';
import { DatabaseModule } from 'src/database/database.module';
import { UserStoryProviders } from './userstory.providers';
import { Module } from '@nestjs/common';
import { UserstoryController } from './userstory.controller';
import { UserstoryService } from './userstory.service';

@Module({
  imports: [DatabaseModule, ProjectModule, HistoryModule, BacklogModule, SprintModule],
  controllers: [UserstoryController],
  providers: [UserstoryService, ...UserStoryProviders],
  exports: [UserstoryService]
})
export class UserstoryModule {}
