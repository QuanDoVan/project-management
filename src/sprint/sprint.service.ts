import { Project } from './../models/project.model';
import { WorkItem } from 'src/models/workitem.model';
import { UserStory } from 'src/models/userstory.model';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Sprint } from 'src/models/sprint.model';
import { ProjectService } from 'src/project/project.service';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class SprintService {
    constructor(
        @Inject('SPRINT_REPOSITORY')
        private readonly sprintRepository: typeof Sprint,
        private readonly projectService: ProjectService
    ) {}

    async getListSprints(project_id: number): Promise<ResponseModel> {
        const listSprints = await this.sprintRepository.findAll({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: ['title', 'status'],
                    include: [
                        {
                            model: Project,
                            required: true,
                            attributes: ['id', 'name'],
                            where: {id: project_id}
                        }
                    ]
                }
            ]
        });

        return sendSuccess({data: listSprints});
    }

    async createSprint(SprintData: any): Promise<ResponseModel> {
        const foundSpint = await this.sprintRepository.findOne({where: {name: SprintData.name}});
        if (foundSpint) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SPRINT_FOUND})
        }

        const createSprint = await this.sprintRepository.create(SprintData);
        return sendSuccess({code: HttpStatus.OK, data: createSprint});
    }

    async getDetailSprint(sprint_id: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSprint = await this.sprintRepository.findByPk(sprint_id);
        if (!foundSprint) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SPRINT_NOT_FOUND})
        }

        const getSprint = await this.sprintRepository.findOne({
            attributes: ['id', 'name', 'start_time', 'end_time'],
            include: [
                {
                    model: UserStory,
                    required: false,
                    attributes: ['id', 'title', 'status', 'type'],
                    include: [
                        {
                            model: WorkItem,
                            required: false,
                            attributes: ['id', 'title', 'status', 'type']
                        }, {
                            model: Project,
                            required: false,
                            attributes: ['id', 'name'],
                            where: {id: project_id}
                        }
                    ]
                }
            ],
            where: {id: foundSprint.id}
        });

        return sendSuccess({data: getSprint});
    }

    async findSprint(id: number): Promise<Sprint> {
        return await this.sprintRepository.findByPk(id);
    }
}
