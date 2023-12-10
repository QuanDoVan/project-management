import { ProjectModule } from 'src/project/project.module';
import { UserModule } from 'src/user/user.module';
import { DatabaseModule } from './../database/database.module';
import { HistoryProviders } from './history.providers';
import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [DatabaseModule, UserModule, ProjectModule],
  controllers: [HistoryController],
  providers: [HistoryService, ...HistoryProviders],
  exports: [HistoryService]
})
export class HistoryModule {}
