import { TeamprojectModule } from './../teamproject/teamproject.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectProviders } from './project.providers';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  imports: [DatabaseModule, TeamprojectModule, OrganizationModule],
  providers: [ProjectService, ...ProjectProviders],
  controllers: [ProjectController],
  exports: [ProjectService]
})
export class ProjectModule {}
