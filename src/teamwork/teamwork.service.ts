import { ProjectService } from 'src/project/project.service';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { UserService } from './../user/user.service';
import { WorkitemService } from './../workitem/workitem.service';
import { TeamWork } from './../models/teamwork.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class TeamworkService {
    constructor(
        @Inject('TEAMWORK_REPOSITORY')
        private readonly teamWorkRepository: typeof TeamWork,
        private readonly workItemService: WorkitemService,
        private readonly userService: UserService,
        private readonly projectService: ProjectService
    ) {}

    async addTeamWork(TeamWorkData: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(TeamWorkData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemService.findWorkItem(TeamWorkData.workitem_id);
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND})
        }

        const foundUser = await this.userService.findUser(TeamWorkData.user_id);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND})
        }

        const foundTeamWork = await this.teamWorkRepository.findOne({where: {workitem_id: TeamWorkData.workitem_id, user_id: TeamWorkData.user_id}})
        if (foundTeamWork) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.TEAMWORK_NOT_FOUND})
        }

        const createTeamWork = await this.teamWorkRepository.create(TeamWorkData);
        return sendSuccess({code: HttpStatus.OK, data: createTeamWork});
    }

    async deleteTeamWork(workitemId: number, userId: number, projectId: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(projectId);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemService.findWorkItem(workitemId);
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND})
        }

        const foundUser = await this.userService.findUser(userId);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND})
        }

        const foundTeamWork = await this.teamWorkRepository.findOne({where: {workitem_id: workitemId, user_id: userId}})
        if (!foundTeamWork) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.TEAMWORK_NOT_FOUND})
        }

        const deleteTeamWork = await this.teamWorkRepository.destroy({where: {workitem_id: workitemId, user_id: userId}})
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_TEAMWORK_SUCCESS});
    }
}
