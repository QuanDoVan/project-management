import { TeamWork } from 'src/models/teamwork.model';
import { TeamworkService } from './teamwork.service';
import { Body, Controller, Delete, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { CreateTeamWorkDto } from './teamwork.dto';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('teamworks')
@ApiBearerAuth()
@Controller('team-work')
export class TeamworkController {
    constructor(
        private readonly teamWorkService: TeamworkService
    ) {}

    @ApiOperation({summary: "Add member teamwork"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createTeamWork(@Body() createTeamWorkDto: CreateTeamWorkDto): Promise<ResponseModel> {
        return this.teamWorkService.addTeamWork(createTeamWorkDto);
    }

    @ApiOperation({summary: "Remove member teamwork"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete()
    async deleteTeamWork(@Query('workitemId', ParseIntPipe) workitemId: number, @Query('userId', ParseIntPipe) userId: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.teamWorkService.deleteTeamWork(workitemId, userId, project_id);
    }
}
