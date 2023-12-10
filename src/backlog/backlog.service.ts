import { response, sendError, sendSuccess } from 'src/commons/response';
import { BackLog } from './../models/backlog.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ProjectService } from 'src/project/project.service';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class BacklogService {
    constructor(
        @Inject('BACKLOG_REPOSITORY')
        private readonly backLogRepository: typeof BackLog,
        private readonly projectService: ProjectService
    ) {}

    async getListBacklog(id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const listBacklog =  await this.backLogRepository.findAll({
            attributes: ['id', 'name'],
            where: {project_id: id}
        });

        return sendSuccess({data: listBacklog})
    }

    async createBacklog(BacklogData: any): Promise<ResponseModel> {
        const foundBacklog = await this.backLogRepository.findOne({where: {name: BacklogData.name}});
        if (foundBacklog) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.BACKLOG_FOUND})
        }
        
        const foundProject = await this.projectService.findProject(BacklogData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }

        const createBacklog = await this.backLogRepository.create(BacklogData);
        return sendSuccess({code: HttpStatus.OK, data: createBacklog})
    }

    async updateBacklog(BacklogData: any, backlogId: number, project_id: number): Promise<ResponseModel> {
        const project = await this.projectService.findProject(project_id);
        const foundProject = await this.projectService.findProject(BacklogData.project_id);
        if (!project || !foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }

        const foundBacklog = await this.backLogRepository.findOne({where: {id: backlogId, project_id: project_id}});
        if (!foundBacklog) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.BACKLOG_NOT_FOUND})
        }

        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }

        const updateBacklog = await foundBacklog.update(BacklogData, {where: {id: foundBacklog.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_BACKLOG_SUCCESS})
    }

    async deleteBacklog(backlogId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }

        const foundBacklog = await this.backLogRepository.findOne({where: {id: backlogId, project_id: project_id}});
        if (!foundBacklog) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.BACKLOG_NOT_FOUND})
        }

        await this.backLogRepository.destroy({where: {id: foundBacklog.id}});
        
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_BACKLOG_SUCCESS})
    }

    async findBackLog(backlogId: number): Promise<BackLog> {
        return await this.backLogRepository.findByPk(backlogId);
    }
}
