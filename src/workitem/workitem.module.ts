import { ProjectModule } from './../project/project.module';
import { HistoryModule } from './../history/history.module';
import { UserstoryModule } from './../userstory/userstory.module';
import { Module } from '@nestjs/common';
import { WorkitemController } from './workitem.controller';
import { WorkitemService } from './workitem.service';
import { WorkItemProviders } from './workitem.providers';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [DatabaseModule, UserstoryModule, HistoryModule, FileModule, ProjectModule],
  controllers: [WorkitemController],
  providers: [WorkitemService, ...WorkItemProviders],
  exports: [WorkitemService]
})
export class WorkitemModule {}
