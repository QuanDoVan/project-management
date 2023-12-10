import { RolesProjectGuard } from './../auth/rolesproject.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateBacklogDto } from './backlog.dto';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BacklogService } from './backlog.service';
import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { BackLog } from 'src/models/backlog.model';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';

@ApiTags('backlogs')
@ApiBearerAuth()
@Controller('back-log')
export class BacklogController {
    constructor(
        private readonly backlogService: BacklogService
    ) {}

    @ApiOperation({summary: 'Add a new backlog'})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createBacklog(@Body() createBacklogDto: CreateBacklogDto): Promise<ResponseModel> {
        return await this.backlogService.createBacklog(createBacklogDto);
    }

    @ApiOperation({summary: 'Get a list of backlog by project'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':project_id')
    async getListBacklog(@Param('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.backlogService.getListBacklog(project_id);
    }

    @ApiOperation({summary: 'Edit a new backlog'})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':backlog_id')
    async updateBacklog(@Param('backlog_id', ParseIntPipe) backlog_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateBacklogDto: CreateBacklogDto): Promise<ResponseModel> {
        return await this.backlogService.updateBacklog(updateBacklogDto, backlog_id, project_id);
    }

    @ApiOperation({summary: 'Delete a new backlog'})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Delete(':backlog_id')
    async deleteBacklog(@Param('backlog_id', ParseIntPipe) backlog_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.backlogService.deleteBacklog(backlog_id, project_id);
    }
}
