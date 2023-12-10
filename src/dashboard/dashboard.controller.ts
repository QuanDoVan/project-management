import { RolesGuard} from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';
import { CreateDashboardDto } from './dashboard.dto';
import { AccessTokenGuard } from './../auth/common/accessToken.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { Dashboard } from 'src/models/dashboard.model';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';

@ApiTags('dashboards')
@ApiBearerAuth()
@ApiConsumes('application/x-www-form-urlencoded')
@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ) {}

    @ApiOperation({summary: "Add a dashboard"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createDashboard(@Body() createDashboardDto: CreateDashboardDto): Promise<ResponseModel> {
        return this.dashboardService.createDashboard(createDashboardDto);
    }

    @ApiOperation({summary: "Get a list of dashboards by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':id')
    async getListDashboard(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.dashboardService.getListDashboard(id);
    }

    @ApiOperation({summary: "Get a list of dashboards by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get('/project/:id')
    async getDashboardByProject(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.dashboardService.getDashboardByProject(id);
    }

    @ApiOperation({summary: "Get dashboard detail by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':dashboard_id/project/:project_id')
    async detailDashboard(@Param('project_id', ParseIntPipe) project_id: number, @Param('dashboard_id', ParseIntPipe) dashboard_id: number): Promise<ResponseModel> {
        return this.dashboardService.detailDashboard(dashboard_id, project_id);
    }

    @ApiOperation({summary: "Edit dashboard"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':dashboard_id')
    async updateDashboard(@Param('dashboard_id', ParseIntPipe) dashboard_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateDashboardDto: CreateDashboardDto): Promise<ResponseModel> {
        return this.dashboardService.updateDashboard(updateDashboardDto, dashboard_id, project_id);
    }

    @ApiOperation({summary: "Delete dashboard"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':dashboard_id')
    async deleteDashboard(@Param('dashboard_id', ParseIntPipe) dashboard_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.dashboardService.deleteDashboard(dashboard_id, project_id);
    }
}