import { Calendar } from './../models/calendar.model';
import { CalendarService } from './calendar.service';
import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards, ParseIntPipe, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { CreateCalendarDto } from './calendar.dto';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard} from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('calendars')
@ApiBearerAuth()
@Controller('calendar')
export class CalendarController {
    constructor(
        private readonly calendarService: CalendarService
    ) {}

    @ApiOperation({summary: "Get a list of calendar"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Get()
    async getListCalendar(@Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.calendarService.getListCalendar(project_id);
    }

    @ApiOperation({summary: "Add a calendar"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createCalendar(@Req() req: Request, @Body() createCalendarDto: CreateCalendarDto): Promise<ResponseModel> {
        return this.calendarService.createCalendar(createCalendarDto, req);
    }

    @ApiOperation({summary: "Get a list of work item by calendar"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Get('work-item')
    async getCalendarByTime(@Query('time') time: string, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.calendarService.getCalendarByTime(time, project_id);
    }

    @ApiOperation({summary: "Get a list of work item by user"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Get('user')
    async getCalendarByUser(@Query('user_id', ParseIntPipe) user_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.calendarService.getCalendarByUser(user_id, project_id);
    }

    @ApiOperation({summary: "Edit a calendar"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':calendar_id')
    async updateCalendar(@Req() req: Request, @Param('calendar_id', ParseIntPipe) calendar_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() createCalendarDto: CreateCalendarDto): Promise<ResponseModel> {
        return this.calendarService.updateCalendar(createCalendarDto, calendar_id, project_id, req);
    }

    @ApiOperation({summary: "Delete a calendar"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Delete(':calendar_id')
    async deleteCalendar(@Param('calendar_id', ParseIntPipe) calendar_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.calendarService.deleteCalendar(calendar_id, project_id);
    }
}
