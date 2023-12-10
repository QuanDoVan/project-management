import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { OrganizationModule } from './organization/organization.module';
import { ProjectModule } from './project/project.module';
import { TeamprojectModule } from './teamproject/teamproject.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WikiModule } from './wiki/wiki.module';
import { SubwikiModule } from './subwiki/subwiki.module';
import { CommentModule } from './comment/comment.module';
import { UserstoryModule } from './userstory/userstory.module';
import { BacklogModule } from './backlog/backlog.module';
import { HistoryModule } from './history/history.module';
import { WorkitemModule } from './workitem/workitem.module';
import { FileModule } from './file/file.module';
import { TeamworkModule } from './teamwork/teamwork.module';
import { SprintModule } from './sprint/sprint.module';
import { CalendarModule } from './calendar/calendar.module';
import { HttpExceptionFilter } from './commons/http-exception.filter';

@Module({
  imports: [
    DatabaseModule, 
    AuthModule, 
    UserModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/uploads/images'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/uploads/files'),
    }),
    ConfigModule.forRoot(),
    OrganizationModule,
    ProjectModule,
    TeamprojectModule,
    DashboardModule,
    WikiModule,
    SubwikiModule,
    CommentModule,
    UserstoryModule,
    BacklogModule,
    HistoryModule,
    WorkitemModule,
    FileModule,
    TeamworkModule,
    SprintModule,
    CalendarModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
          whitelist: true,
      })
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
