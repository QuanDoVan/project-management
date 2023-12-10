import { UserModule } from 'src/user/user.module';
import { ProjectModule } from 'src/project/project.module';
import { TeamProjectProviders } from './teamproject.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Module, forwardRef } from '@nestjs/common';
import { TeamprojectService } from './teamproject.service';
import { TeamprojectController } from './teamproject.controller';

@Module({
  imports: [DatabaseModule],
  providers: [TeamprojectService, ...TeamProjectProviders],
  controllers: [TeamprojectController],
  exports: [TeamprojectService]
})
export class TeamprojectModule {}
