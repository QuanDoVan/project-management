import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { Body, Controller, Get, Post, Query, UseGuards, ParseIntPipe, Param, Req, Patch, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { ProjectService } from './project.service';;
import { CreateProjectDto } from './project.dto';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('projects')
@ApiBearerAuth()
@Controller('project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @ApiOperation({summary: "Add a new project"})
    @Roles(ROLE.ADMIN)
    // @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createProject(@Req() req: Request, @Body() createProjectDto: CreateProjectDto): Promise<ResponseModel> {
        return this.projectService.createProject(createProjectDto, req['user']);
    }

    @ApiOperation({summary: "Get a list of project by user" })
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('/user')
    async getProjecByUser(@Req() req: Request): Promise<ResponseModel> {
        return this.projectService.getProjectByUser(req)
    }    

    @ApiOperation({summary: "Filter projects by organization" })
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('filter')
    async filterProject(@Query('name') name: string, @Query('organization_id', ParseIntPipe) organization_id: number): Promise<ResponseModel> {
        return this.projectService.filterProject(name, organization_id);
    }

    @ApiOperation({summary: "Get project details"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':id')
    async getDetailProject(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.projectService.getDetailProject(id);
    }

    @ApiOperation({summary: "Edit a project"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':id')
    async updateProject(@Param('id', ParseIntPipe) id: number, @Body() createProjectDto: CreateProjectDto): Promise<ResponseModel> {
        return this.projectService.updateProject(id, createProjectDto);
    }

    @ApiOperation({summary: "Delete a project"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.projectService.deleteProject(id);
    }
}
