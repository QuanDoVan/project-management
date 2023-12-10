import { ProjectService } from './../project/project.service';
import { sendSuccess, response, sendError  } from 'src/commons/response';
import { WorkitemService } from './../workitem/workitem.service';
import { UserService } from './../user/user.service';
import { Calendar } from './../models/calendar.model';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class CalendarService {
    constructor(
        @Inject('CALENDAR_REPOSITORY')
        private readonly calendarRepository: typeof Calendar,
        private readonly userService: UserService,
        private readonly workItemService: WorkitemService,
        private readonly projectService: ProjectService
    ) {}

    async getListCalendar(project_id: number): Promise<ResponseModel> {
        const listCalendar = await this.calendarRepository.findAll({where: {project_id: project_id}});
        return sendSuccess({data: listCalendar});
    }

    async createCalendar(CalendarData: any, req: any): Promise<ResponseModel> {
        const foundWorkItem = await this.workItemService.findWorkItem(CalendarData.workitem_id);
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND})
        }

        const foundCalendar = await this.calendarRepository.findOne({
            where: {
                time: CalendarData.time, 
                workitem_id: CalendarData.workitem_id
            }
        })
        if (foundCalendar) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.CALENDAR_FOUND})
        }

        const totalTime = CalendarData.hours_use + (CalendarData.minutes_use/60);

        const createCalendar = await this.calendarRepository.create({
            ...CalendarData, 
            used_time: totalTime,
            user_id: req.user.id
        });
        return sendSuccess({code: HttpStatus.OK, data: createCalendar});
    }

    async getCalendarByTime(time: any, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const getCalendar = await this.calendarRepository.findAll({
            where: {
                time: time,
                project_id: project_id
            }
        })

        return sendSuccess({data: getCalendar});
    }

    async getCalendarByUser(user_id: any, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const getCalendar = await this.calendarRepository.findAll({
            where: {
                user_id: user_id,
                project_id: project_id
            }
        })

        return sendSuccess({data: getCalendar});
    }

    async updateCalendar(CalendarData: any, calendarId: number, project_id: number, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        
        const foundCalendar = await this.calendarRepository.findOne({
            where: {
                id: calendarId,
                project_id: project_id
            }
        });
        if (!foundCalendar) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.CALENDAR_NOT_FOUND})
        }

        const foundWorkItem = await this.workItemService.findWorkItem(CalendarData.workitem_id);
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND})
        }

        const totalTime = CalendarData.hours_use + (CalendarData.minutes_use/60);

        const updateCalendar = await this.calendarRepository.update({
            ...CalendarData, 
            used_time: totalTime,
            user_id: req.user.id
        }, {where: {id: calendarId}});

        return sendSuccess({code: HttpStatus.OK, message: response.UPDATE_CALENDAR_SUCCESS});
    }

    async deleteCalendar(calendarId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        
        const foundCalendar = await this.calendarRepository.findOne({
            where: {
                id: calendarId,
                project_id: project_id
            }
        });
        if (!foundCalendar) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.CALENDAR_NOT_FOUND})
        }

        await this.calendarRepository.destroy({where: {id: calendarId}});
        
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_CALENDAR_SUCCESS});
    }
}
