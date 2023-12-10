import { ProjectModule } from './../project/project.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { TeamworkController } from './teamwork.controller';
import { TeamworkService } from './teamwork.service';
import { TeamWorkProviders } from './teamwork.providers';
import { WorkitemModule } from 'src/workitem/workitem.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, WorkitemModule, UserModule, ProjectModule],
  controllers: [TeamworkController],
  providers: [TeamworkService, ...TeamWorkProviders]
})
export class TeamworkModule {}
