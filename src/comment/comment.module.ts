import { ProjectModule } from './../project/project.module';
import { HistoryModule } from './../history/history.module';
import { WorkitemModule } from './../workitem/workitem.module';
import { SubwikiModule } from './../subwiki/subwiki.module';
import { WikiModule } from './../wiki/wiki.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentProviders } from './comment.providers';

@Module({
  imports: [DatabaseModule, WikiModule, SubwikiModule, WorkitemModule, HistoryModule, ProjectModule],
  controllers: [CommentController],
  providers: [CommentService, ...CommentProviders]
})
export class CommentModule {}
