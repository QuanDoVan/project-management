import { TeamProject } from './../models/teamproject.model';
import { Organization } from 'src/models/organization.model';
import { TeamprojectService } from './../teamproject/teamproject.service';
import { OrganizationService } from '../organization/organization.service'
import { Project } from './../models/project.model';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { Op } from 'sequelize';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class ProjectService {
    constructor(
        @Inject('PROJECT_REPOSITORY')
        private readonly projectRepository: typeof Project,
        private readonly teamProjectRepository: TeamprojectService,
        private readonly organizationService: OrganizationService
    ) {}

    async createProject(ProjectData: any, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectRepository.findOne({where: {name: ProjectData.name}});
        if (foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_FOUND})
        }
        const foundOrganization = await this.organizationService.findOrganization(ProjectData.organization_id);
        if (!foundOrganization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_NOT_FOUND})
        }
        const createProject = await this.projectRepository.create({...ProjectData, owner_id: user.id});
        const createTeamProject = await this.teamProjectRepository.addTeamProject({
            project_id: createProject.id,
            user_id: user.id,
            role_id: 3
        })
        return sendSuccess({code: HttpStatus.OK, data: createProject});
    } 

    async getProjectByUser(req: any): Promise<ResponseModel> {
        const getProject = await this.projectRepository.findAll({
            attributes: ['id', 'name', 'description', 'date_created', 'date_updated'],
            include: [
                {
                    model: TeamProject,
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
                    model: User,
                    required: false,
                    attributes: ['full_name', 'email']
                }, {
                    model: Organization,
                    required: false,
                    attributes: ['name']
                }
            ],
            where: {owner_id: req.user.id}
        });

        return sendSuccess({data: getProject});
    }

    async filterProject(name: string, organizationId: number): Promise<ResponseModel> {
        const foundOrganization = await this.organizationService.findOrganization(organizationId);
        if (!foundOrganization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_NOT_FOUND})
        }

        const listProject = await this.projectRepository.findAll({
            attributes: ['id', 'name', 'description'],
            include: [
                {
                    model: User,
                    required: false,
                    attributes: ['full_name', 'email']
                }
            ],
            where: {
                [Op.and] : [
                    {name: {[Op.like]: `%${name}%`}},
                    {organization_id: organizationId}
                ]
            }
        })
        
        if (listProject.length === 0) return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        return sendSuccess({data: listProject});
    }

    async getDetailProject(projectId: number): Promise<ResponseModel> {
        const project = await this.projectRepository.findOne({
            attributes: ['id', 'name', 'description', 'date_created'],
            include: [
                {
                    model: Organization,
                    required: false,
                    attributes: ['name']
                }, {
                    model: User,
                    required: false,
                    attributes: ['full_name', 'email']
                }, {
                    model: TeamProject,
                    required: false,
                    attributes: ['user_id'],
                    include: [
                        {
                            model: User,
                            required: false,
                            attributes: ['full_name', 'email']
                        }
                    ]
                }
            ],
            where: {
                id: projectId
            }
        });
        if (!project) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }
        return sendSuccess({data: project});
    }

    async updateProject(projectId: number, ProjectData: any): Promise<ResponseModel> {
        const foundProject = await this.projectRepository.findByPk(projectId);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }
        const foundOrganization = await this.organizationService.findOrganization(ProjectData.organization_id);
        if (!foundOrganization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_NOT_FOUND})
        }
        const updateProject = await this.projectRepository.update(ProjectData, {where: {id: foundProject.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_PROJECT_SUCCESS});
    } 

    async deleteProject(projectId: number): Promise<ResponseModel> {
        const foundProject = await this.projectRepository.findByPk(projectId);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        }
        await this.projectRepository.destroy({where: {id: foundProject.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_PROJECT_SUCCESS});
    }

    async findProject(projectId: number): Promise<Project> {
        return this.projectRepository.findByPk(projectId);
    }
}
