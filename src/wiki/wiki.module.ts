import { ProjectModule } from './../project/project.module';
import { UserModule } from './../user/user.module';
import { WikiProviders } from './wiki.providers';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { WikiController } from './wiki.controller';
import { WikiService } from './wiki.service';

@Module({
  imports: [DatabaseModule, UserModule, ProjectModule],
  controllers: [WikiController],
  providers: [WikiService, ...WikiProviders],
  exports: [WikiService]
})
export class WikiModule {}
