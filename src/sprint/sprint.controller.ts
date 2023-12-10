import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';
import { Sprint } from 'src/models/sprint.model';
import { SprintService } from './sprint.service';
import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { CreateSprintDto } from './sprint.dto';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';

@ApiTags('sprints')
@ApiBearerAuth()
@Controller('sprint')
export class SprintController {
    constructor(
        private readonly sprintService: SprintService
    ) {}

    @ApiOperation({summary: "Get a list of sprints by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get()
    async getListSprints(@Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.sprintService.getListSprints(project_id);
    }

    @ApiOperation({summary: "Add a sprint"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createSprint(@Body() createSprintDto: CreateSprintDto): Promise<ResponseModel> {
        return this.sprintService.createSprint(createSprintDto)
    }

    @ApiOperation({summary: "Get a list of user story and workitem by sprints"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':sprint_id')
    async getDetailSprints(@Param('sprint_id', ParseIntPipe) sprint_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.sprintService.getDetailSprint(sprint_id, project_id);
    }
}
