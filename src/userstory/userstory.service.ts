import { TeamWork } from 'src/models/teamwork.model';
import { SprintService } from './../sprint/sprint.service';
import { WorkItem } from './../models/workitem.model';
import { Project } from './../models/project.model';
import { BacklogService } from './../backlog/backlog.service';
import { HistoryService } from './../history/history.service';
import { ProjectService } from './../project/project.service';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { UserStory } from './../models/userstory.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { File } from 'src/models/file.model';
import { Comment } from 'src/models/comment.model';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class UserstoryService {
    constructor(
        @Inject('USERSTORY_REPOSITORY')
        private readonly userStoryRepository: typeof UserStory,
        private readonly projectService: ProjectService,
        private readonly historyService: HistoryService,
        private readonly backlogService: BacklogService,
        private readonly sprintService: SprintService
    ) {}

    async getListUserStory(project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const listUserStory = await this.userStoryRepository.findAll({
            attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type'],
            include: [
                {
                    model: Project,
                    required: false,
                    attributes: ['id', 'name']
                }, {
                    model: WorkItem,
                    required: false,
                    attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type'],
                    include: [
                        {
                            model: TeamWork,
                            required: false,
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    required: false,
                                    attributes: ['full_name', 'email']
                                }
                            ]
                        }, {
                            model: File,
                            required: false,
                            attributes: ['name']
                        }, {
                            model: Comment,
                            required: false,
                            attributes: ['content', 'created_at']
                        }
                    ]
                }
            ],
            where: {project_id: project_id}
        })

        return sendSuccess({data: listUserStory});
    }

    async createUserStory(UserStoryData: any, user: any): Promise<ResponseModel> {
        const foundUserStory = await this.userStoryRepository.findOne({where: {title: UserStoryData.title}});
        if (foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_FOUND});
        }

        const foundProject = await this.projectService.findProject(UserStoryData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSprint = await this.sprintService.findSprint(UserStoryData.sprint_id);
        if (!foundSprint) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SPRINT_NOT_FOUND});
        }
        
        const createUserStory = await this.userStoryRepository.create({
            ...UserStoryData,
            area: foundProject.name,
            type: 'user_story'
        });

        const createHistory = await this.historyService.createHistory({
            status: 'created User Story',
            user_id: user.id,
            userstory_id: createUserStory.id,
        })

        return sendSuccess({code: HttpStatus.OK, data: createUserStory});
    }

    async getDetailUserStory(userStoryId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundUserStory = await this.userStoryRepository.findOne({
            attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type'],
            include: [
                {
                    model: Project,
                    required: false,
                    attributes: ['id', 'name']
                }, {
                    model: WorkItem,
                    required: false,
                    attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type'],
                    include: [
                        {
                            model: TeamWork,
                            required: false,
                            attributes: ['user_id'],
                            include: [
                                {
                                    model: User,
                                    required: false,
                                    attributes: ['full_name', 'email']
                                }
                            ]
                        }, {
                            model: File,
                            required: false,
                            attributes: ['name']
                        }, {
                            model: Comment,
                            required: false,
                            attributes: ['content', 'created_at']
                        }
                    ]
                }
            ],
            where: {id: userStoryId, project_id: project_id}
        })
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }
        return sendSuccess({data: foundUserStory});
    }

    async changeStatus(StatusUserStory: any, userStoryId: number, project_id: number, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        
        const foundUserStory = await this.userStoryRepository.findOne({
            where: {
                id: userStoryId,
                project_id: project_id
            }
        });
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }

        const updateUserStory = await this.userStoryRepository.update({
            status: StatusUserStory.status
            }, {
                where: {id: foundUserStory.id, project_id: project_id}
            }
        );

        const createHistory = await this.historyService.createHistory({
            status: `changed ${StatusUserStory.status}`,
            user_id: user.id,
            userstory_id: foundUserStory.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_USERSTORY_SUCCESS});
    }

    async addBacklog(BacklogUserStory: any, userStoryId: number, project_id: number, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

       const foundUserStory = await this.userStoryRepository.findOne({
            where: {
                id: userStoryId,
                project_id: project_id
            }
        });
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }

        const foundBacklog = await this.backlogService.findBackLog(BacklogUserStory.backlog_id);
        if (!foundBacklog) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.BACKLOG_NOT_FOUND});
        }

        const updateUserStory = await this.userStoryRepository.update({
            backlog_id: BacklogUserStory.backlog_id
            }, {
                where: {id: foundUserStory.id}
            }
        );

        const createHistory = await this.historyService.createHistory({
            status: `changed backlog to ${BacklogUserStory.backlog_id}`,
            user_id: user.id,
            userstory_id: foundUserStory.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_USERSTORY_SUCCESS});
    }

    async updateUserStory(UserStoryData: any, userStoryId: number, project_id: number, user: any): Promise<ResponseModel> {
        const foundUserStory = await this.userStoryRepository.findByPk(userStoryId);
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }

        const foundProject = await this.projectService.findProject(UserStoryData.project_id || project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const updateUserStory = await this.userStoryRepository.update({
                ...UserStoryData,
                area: foundProject.name,
                type: 'user_story'
            }, {
                where: {id: foundUserStory.id}
            }
        );

        const createHistory = await this.historyService.createHistory({
            status: 'edited User Story',
            user_id: user.id,
            userstory_id: foundUserStory.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_USERSTORY_SUCCESS});
    }

    async deleteUserStory(userStoryId: number, project_id: number, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundUserStory = await this.userStoryRepository.findOne({where: {id: userStoryId, project_id: project_id}});
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }

        await this.userStoryRepository.destroy({where: {id: foundUserStory.id}});

        const createHistory = await this.historyService.createHistory({
            status: `removed User Story #${foundUserStory.id}`,
            user_id: user.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_USERSTORY_SUCCESS});
    }

    async addSprints(sprintId: number, userStoryId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSprint = await this.sprintService.findSprint(sprintId);
        if (!foundSprint) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SPRINT_NOT_FOUND});
        }

        const foundUserStory = await this.userStoryRepository.findOne({where: {id: userStoryId, project_id: project_id}});
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }

        const addSprints = await this.userStoryRepository.update({sprint_id: foundSprint.id}, {where: {id: foundUserStory.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.ADD_SPRINTS_SUCCESS});
    }

    async findUserStory(id: number): Promise<UserStory> {
        return await this.userStoryRepository.findByPk(id);
    }
}
