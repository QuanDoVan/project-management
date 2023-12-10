import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { UserStory } from './../models/userstory.model';
import { CreateUserStoryDto, UpdateBackLogUserStoryDto, UpdateStatusUserStoryDto, UpdateUserStoryDto } from './userstory.dto';
import { UserstoryService } from './userstory.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('userstories')
@ApiBearerAuth()
@Controller('user-story')
export class UserstoryController {
    constructor(
        private readonly userStoryService: UserstoryService
    ) {}

    @ApiOperation({summary: "Get a list of user story by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get()
    async getListUserStory(@Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.userStoryService.getListUserStory(project_id);
    }

    @ApiOperation({summary: "Add a user story"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createUserStory(@Req() req: Request, @Body() createUserStoryDto: CreateUserStoryDto): Promise<ResponseModel> {
        return this.userStoryService.createUserStory(createUserStoryDto, req['user']);
    }

    @ApiOperation({summary: "Add user story in sprints"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Patch(':userstory_id/sprint')
    async addSprintUserStory(@Query('sprintId', ParseIntPipe) sprintId: number, @Query('userStoryId', ParseIntPipe) userStoryId: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.userStoryService.addSprints(sprintId, userStoryId, project_id);
    }

    @ApiOperation({summary: "Get user story details"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':userstory_id')
    async getDetailUserStory(@Param('userstory_id', ParseIntPipe) userstory_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.userStoryService.getDetailUserStory(userstory_id, project_id);
    }

    @ApiOperation({summary: "Update status a user story"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':userstory_id/status')
    async updateSatusUserStory(@Req() req: Request, @Param('userstory_id', ParseIntPipe) userstory_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateStatusUserStoryDto: UpdateStatusUserStoryDto): Promise<ResponseModel> {
        return this.userStoryService.changeStatus(updateStatusUserStoryDto, userstory_id, project_id, req['user']);
    }

    @ApiOperation({summary: "Add backlog a user story"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':userstory_id/backlog')
    async updateBacklogUserStory(@Req() req: Request, @Param('userstory_id', ParseIntPipe) userstory_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateBackLogUserStoryDto: UpdateBackLogUserStoryDto): Promise<ResponseModel> {
        return this.userStoryService.addBacklog(updateBackLogUserStoryDto, userstory_id, project_id, req['user']);
    }
    
    @ApiOperation({summary: "Edit a user story"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':userstory_id')
    async updateUserStory(@Req() req: Request, @Param('userstory_id', ParseIntPipe) userstory_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateUserStoryDto: UpdateUserStoryDto): Promise<ResponseModel> {
        return this.userStoryService.updateUserStory(updateUserStoryDto, userstory_id, project_id, req['user']);
    }

    @ApiOperation({summary: "Delete a user story"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':userstory_id')
    async deleteUserStory(@Req() req: Request, @Param('userstory_id', ParseIntPipe) userstory_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.userStoryService.deleteUserStory(userstory_id, project_id, req['user']);
    }
}

