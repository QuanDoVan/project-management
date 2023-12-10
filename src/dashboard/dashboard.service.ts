import { response, sendError, sendSuccess } from 'src/commons/response';
import { ProjectService } from './../project/project.service';
import { Dashboard } from './../models/dashboard.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class DashboardService {
    constructor(
        @Inject('DASHBOARD_REPOSITORY')
        private readonly dashboardRepository: typeof Dashboard,
        private readonly projectService: ProjectService
    ){}

    async getListDashboard(id: number): Promise<ResponseModel>{
        const listDashboard = await this.dashboardRepository.findAll({
            where: {project_id: id}
        });
        return sendSuccess({data: listDashboard});
    }

    async getDashboardByProject(projectId: number): Promise<ResponseModel> {
        const foundProject = await this.dashboardRepository.findOne({where: {project_id: projectId}});
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.DASHBOARD_NOT_FOUND})
        }
        const getDashboard =  await this.dashboardRepository.findAll({where: {project_id: projectId}});
        return sendSuccess({data: getDashboard});
    }

    async createDashboard(DashboardData: any): Promise<ResponseModel>{
        const foundDashboard = await this.dashboardRepository.findOne({where: {name: DashboardData.name}});
        if (foundDashboard) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.DASHBOARD_FOUND})
        }
        const foundProject = await this.projectService.findProject(DashboardData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND})
        } 
        const createDashboard = await this.dashboardRepository.create(DashboardData);
        return sendSuccess({code: HttpStatus.OK, data: createDashboard})
    }

    async detailDashboard(dashboardId: number, projectId: number): Promise<ResponseModel> {
        const dashboard = await this.dashboardRepository.findOne({
            where: {
                id: dashboardId,
                project_id: projectId
            }
        });
        if (!dashboard) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.DASHBOARD_NOT_FOUND})
        }
        return sendSuccess({data: dashboard});
    }

    async updateDashboard(DashboardData: any, dashboardId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(DashboardData.project_id);
        const foundProjectData = await this.projectService.findProject(DashboardData.project_id);
        if (!foundProject || !foundProjectData) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundDashboard = await this.dashboardRepository.findOne({where: {id: dashboardId, project_id: project_id}});
        if (!foundDashboard) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.DASHBOARD_NOT_FOUND})
        }
        await foundDashboard.update(DashboardData, {where: {id: dashboardId}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_DASHBOARD_SUCCESS})
    }

    async deleteDashboard(dashboardId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundDashboard = await this.dashboardRepository.findByPk(dashboardId);
        if (!foundDashboard) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.DASHBOARD_NOT_FOUND})
        }
        await this.dashboardRepository.destroy({where: {id: foundDashboard.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_DASHBOARD_SUCCESS})
    }
}
