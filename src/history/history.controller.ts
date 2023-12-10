import { HistoryService } from './history.service';
import { Controller, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { History } from 'src/models/history.model';

@ApiTags('histories')
@ApiBearerAuth()
@Controller('history')
export class HistoryController {
    constructor(
        private readonly historyService: HistoryService
    ) {}

    @ApiOperation({summary: "Get a list of history by user"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Get(':user_id')
    async getHistoryByUser(@Param('user_id', ParseIntPipe) user_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.historyService.getHistoryByUser(user_id, project_id);
    }
}
