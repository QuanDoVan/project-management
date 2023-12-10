import { Module } from '@nestjs/common';
import { BacklogController } from './backlog.controller';
import { BacklogService } from './backlog.service';
import { BackLogProviders } from './backlog.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [DatabaseModule, ProjectModule],
  controllers: [BacklogController],
  providers: [BacklogService, ...BackLogProviders],
  exports: [BacklogService]
})
export class BacklogModule {}
