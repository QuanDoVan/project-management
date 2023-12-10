import { ProjectModule } from './../project/project.module';
import { WorkitemModule } from './../workitem/workitem.module';
import { UserModule } from './../user/user.module';
import { DatabaseModule } from './../database/database.module';
import { CalendarProviders } from './calendar.providers';
import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  imports: [DatabaseModule, UserModule, WorkitemModule, ProjectModule],
  controllers: [CalendarController],
  providers: [CalendarService, ...CalendarProviders]
})
export class CalendarModule {}
