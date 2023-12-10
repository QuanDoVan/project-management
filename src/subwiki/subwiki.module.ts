import { ProjectModule } from './../project/project.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { SubwikiController } from './subwiki.controller';
import { SubwikiService } from './subwiki.service';
import { SubWikiProviders } from './subwik.providers';
import { WikiModule } from 'src/wiki/wiki.module';

@Module({
  imports: [DatabaseModule, WikiModule, ProjectModule], 
  controllers: [SubwikiController],
  providers: [SubwikiService, ...SubWikiProviders],
  exports: [SubwikiService]
})
export class SubwikiModule {}
