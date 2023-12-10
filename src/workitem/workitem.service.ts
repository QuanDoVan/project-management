import { TeamWork } from 'src/models/teamwork.model';
import { Project } from 'src/models/project.model';
import { UserStory } from 'src/models/userstory.model';
import { HistoryService } from './../history/history.service';
import { UserstoryService } from './../userstory/userstory.service';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { WorkItem } from './../models/workitem.model';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { User } from 'src/models/user.model';
import { Comment } from 'src/models/comment.model';
import { File } from 'src/models/file.model';
import { History } from 'src/models/history.model';
import { ProjectService } from 'src/project/project.service';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class WorkitemService {
    constructor(
        @Inject('WORKITEM_REPOSITORY')
        private readonly workItemRepository: typeof WorkItem,
        private readonly userStoryService: UserstoryService,
        private readonly historyService: HistoryService,
        private readonly fileService: FileService,
        private readonly projectService: ProjectService
    ) {}

    async getListWorkItem(projectId: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(projectId);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const listWorkItem = await this.workItemRepository.findAll({
            attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type', 'created_at'],
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: ['id', 'title', 'created_at'],
                    include: [
                        {
                            model: Project,
                            required: true,
                            attributes: [],
                            where: {id: projectId}
                        }
                    ]
                }, {
                    model: TeamWork,
                    required: true,
                    attributes: ['user_id'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: ['full_name', 'email']
                        }
                    ]
                }, {
                    model: History,
                    required: false,
                    attributes: ['status', 'created_at'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: ['full_name', 'email']
                        }
                    ]
                }, {
                    model: Comment,
                    required: false,
                    attributes: ['content', 'created_at'],
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
                    attributes: ['name', 'date_created']
                }
            ]
        })

        return sendSuccess({data: listWorkItem});
    }

    async getDetailWorkItem(workitem_id: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemRepository.findOne({
            attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type', 'created_at'],
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: ['id', 'title', 'created_at'],
                    include: [
                        {
                            model: Project,
                            required: false,
                            attributes: [],
                            where: {id: project_id}
                        }
                    ]
                }, {
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
                    model: History,
                    required: false,
                    attributes: ['status', 'created_at'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: ['full_name', 'email']
                        }
                    ]
                }, {
                    model: Comment,
                    required: false,
                    attributes: ['content', 'created_at'],
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
                    attributes: ['name', 'date_created']
                }
            ],
            where: {id: workitem_id}
        });

        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        return sendSuccess({data: foundWorkItem});
    }

    async filterWorkItem(type: string, status: string, area: string): Promise<ResponseModel> {
        const filterWorkItemObj: any = {};
        if (type) {
            filterWorkItemObj.type = type;
        }
        if (status) {
            filterWorkItemObj.status = status;
        }
        if (area) {
            filterWorkItemObj.area = area;
        }
      
        const filterWorkItem = await this.workItemRepository.findAll({
            attributes: ['id', 'title', 'status', 'area', 'reason', 'description', 'priority', 'type', 'created_at'],
            include: [
                {
                    model: UserStory,
                    required: false,
                    attributes: ['id', 'title', 'created_at']
                }
            ],
            where: filterWorkItemObj
        })
        return filterWorkItem.length > 0 ? sendSuccess({data: filterWorkItem}) : sendError({code: HttpStatus.BAD_REQUEST, message: response.FILTER_NOT_FOUND});
    }

    async createWorkItem(WorkItemData: any, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(WorkItemData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemRepository.findOne({where: {title: WorkItemData.title}});
        if (foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_FOUND});
        }

        const foundUserStory = await this.userStoryService.findUserStory(WorkItemData.userstory_id);
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }
        
        const createWorkItem = await this.workItemRepository.create({
            title: WorkItemData.title,
            status: WorkItemData.status,
            reason: WorkItemData.reason,
            description: WorkItemData.description,
            priority: WorkItemData.priority,
            activity: WorkItemData.activity,
            type: WorkItemData.type,
            userstory_id: WorkItemData.userstory_id,
            area: foundUserStory.area,
        });

        const createHistory = await this.historyService.createHistory({
            status: `created ${WorkItemData.type}`,
            user_id: req.user.id,
            workitem_id: createWorkItem.id,
        })

        return sendSuccess({code: HttpStatus.OK, data: createWorkItem});
    }

    async updateWorkItem(WorkItemData: any, req: any, workitem_id: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        
        const foundWorkItem = await this.workItemRepository.findOne({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: [],
                    where: {project_id: project_id}
                }
            ],
            where: {id: workitem_id}
        });

        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        const foundUserStory = await this.userStoryService.findUserStory(WorkItemData.userstory_id);
        if (!foundUserStory) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_STORY_NOT_FOUND});
        }
        
        const updateWorkItem = await this.workItemRepository.update({
            ...WorkItemData,
            area: WorkItemData.name,
        }, {
            where: {id: foundWorkItem.id}
        });

        const createHistory = await this.historyService.createHistory({
            status: `updated ${foundWorkItem.type}`,
            user_id: req.user.id,
            workitem_id: foundWorkItem.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_WORKITEM_SUCCESS});
    }    

    async updateStatus(WorkItemData: any, workitem_id: number, project_id: number, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemRepository.findOne({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: [],
                    where: {project_id: project_id}
                }
            ],
            where: {id: workitem_id}
        });
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        const updateStatus = await this.workItemRepository.update({
            status: WorkItemData.status
        }, {
            where: {id: foundWorkItem.id}
        })

        const createHistory = await this.historyService.createHistory({
            status: `changed ${WorkItemData.status}`,
            user_id: req.user.id,
            workitem_id: foundWorkItem.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_WORKITEM_SUCCESS});
    }

    async changeTitle(WorkItemData: any, workitem_id: number, project_id: number, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        const foundWorkItem = await this.workItemRepository.findOne({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: [],
                    where: {project_id: project_id}
                }
            ],
            where: {id: workitem_id}
        });
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        const updateTitle = await this.workItemRepository.update({
            title: WorkItemData.title
        }, {
            where: {id: foundWorkItem.id}
        })

        const createHistory = await this.historyService.createHistory({
            status: `changed title`,
            user_id: req.user.id,
            workitem_id: foundWorkItem.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_WORKITEM_SUCCESS});
    }

    async deleteWorkItem(workitem_id: number, project_id: number, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        const foundWorkItem = await this.workItemRepository.findOne({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: [],
                    where: {project_id: project_id}
                }
            ],
            where: {id: workitem_id}
        });
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        await this.workItemRepository.destroy({where: {id: foundWorkItem.id}});

        const createHistory = await this.historyService.createHistory({
            status: `removed ${foundWorkItem.type} #${foundWorkItem.id}`,
            user_id: req.user.id,
        })

        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_WORKITEM_SUCCESS});
    }

    async uploadFilesWorkItem(file: any, workitem_id: number, project_id: number, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemRepository.findOne({
            include: [
                {
                    model: UserStory,
                    required: true,
                    attributes: [],
                    where: {project_id: project_id}
                }
            ],
            where: {id: workitem_id}
        });
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND});
        }

        if (!file) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.FILE_NOT_FOUND});
        }

        const createFile = await this.fileService.createFile(file, workitem_id, req);

        const createHistory = await this.historyService.createHistory({
            status: `uploaded file`,
            user_id: req.user.id,
            workitem_id: workitem_id
        })

        return sendSuccess({code: HttpStatus.OK, data: process.env.BASE_URL + createFile.name});
    }

    async findWorkItem(id: number): Promise<WorkItem> {
        return await this.workItemRepository.findByPk(id);
    }
}
