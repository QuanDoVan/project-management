import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubwikiService } from './subwiki.service';
import { Body, Controller, Param, ParseIntPipe, Patch, Post, Req, UseGuards, Delete, Get, Query } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { SubWiki } from 'src/models/subwiki.model';
import { CreateSubWikiDto, UpdateSubWikiDto } from './subwiki.dto';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from 'src/auth/rolesproject.guard';

@ApiTags('subwikis')
@ApiBearerAuth()
@Controller('sub-wiki')
export class SubwikiController {
    constructor(
        private readonly subWikiService: SubwikiService,
    ) {}

    @ApiOperation({summary: "Get a list of sub wiki"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get()
    async getListSubWiki(@Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.subWikiService.getListSubWiki(project_id);
    }

    @ApiOperation({summary: "Add a sub wiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createSubWiki(@Req() req: Request, @Body() createSubWikiDto: CreateSubWikiDto): Promise<ResponseModel> {
        return this.subWikiService.createSubWiki(createSubWikiDto, req['user']);
    }

    @ApiOperation({summary: "Get sub wiki details"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':subwiki_id')
    async detailSubWiki(@Param('subwiki_id', ParseIntPipe) subwiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.subWikiService.detailSubWiki(subwiki_id, project_id);
    }

    @ApiOperation({summary: "Edit a sub wiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':subwiki_id')
    async updateSubWiki(@Param('subwiki_id', ParseIntPipe) subwiki_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateSubWikiDto: UpdateSubWikiDto): Promise<ResponseModel> {
        return this.subWikiService.updateSubWiki(updateSubWikiDto, subwiki_id, project_id);
    }

    @ApiOperation({summary: "Delete a subwiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':subwiki_id')
    async deleteWiki(@Param('subwiki_id', ParseIntPipe) subwiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.subWikiService.deleteSubWiki(subwiki_id, project_id);
    }
}
