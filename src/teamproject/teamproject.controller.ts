import { CreateTeamProjectDto } from './teamproject.dto';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { TeamprojectService } from './teamproject.service';
import { Body, Controller, Post, UseGuards, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('teamprojects')
@ApiBearerAuth()
@Controller('team-project')
export class TeamprojectController {
    constructor(
        private readonly teamProjectService: TeamprojectService
    ){}

    @ApiOperation({summary: "Add members to a project"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async addTeamProject(@Body() createTeamProjectDto: CreateTeamProjectDto): Promise<ResponseModel> {
        return this.teamProjectService.addTeamProject(createTeamProjectDto);
    }

    @ApiOperation({summary: "Remove members from a project"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Delete()
    async deleteTeamProject(@Query('project_id', ParseIntPipe) project_id: number, @Query('user_id', ParseIntPipe) user_id: number): Promise<ResponseModel> {
        return await this.teamProjectService.deleteTeamProject(project_id, user_id);
    }
}
