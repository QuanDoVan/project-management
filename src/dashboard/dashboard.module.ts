import { ProjectModule } from './../project/project.module';
import { DashboardProviders } from './dashboard.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [DatabaseModule, ProjectModule],
  controllers: [DashboardController],
  providers: [DashboardService, ...DashboardProviders]
})
export class DashboardModule {}
