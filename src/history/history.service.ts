import { ProjectService } from 'src/project/project.service';
import { ResponseModel } from 'src/commons/constant';
import { response, sendSuccess, sendError } from './../commons/response';
import { UserService } from './../user/user.service';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { History } from 'src/models/history.model';

@Injectable()
export class HistoryService {
    constructor(
        @Inject('HISTORY_REPOSITORY')
        private readonly historyRepository: typeof History,
        private readonly userService: UserService,
        private readonly projectService: ProjectService
    ) {}

    async createHistory(HistoryData: any): Promise<any> {
        const createHistory = await this.historyRepository.create(HistoryData);
    }

    async getHistoryByUser(userId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundUser = await this.userService.findUser(userId);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        const getHistory = await this.historyRepository.findAll({where: {user_id: userId}});
        return sendSuccess({data: getHistory});
    }
}
