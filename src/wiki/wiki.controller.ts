import { RolesGuard } from './../auth/roles.guard';
import { Wiki } from './../models/wiki.model';
import { CreateWikiDto } from './wiki.dto';
import { AccessTokenGuard } from './../auth/common/accessToken.guard';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WikiService } from './wiki.service';
import { Body, Controller, Param, Post, Req, UseGuards, ParseIntPipe, Patch, Delete, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { RolesProjectGuard } from 'src/auth/rolesproject.guard';

@ApiTags('wikis')
@ApiBearerAuth()
@Controller('wiki')
export class WikiController {
    constructor(
        private readonly wikiService: WikiService
    ) {}

    @ApiOperation({summary: "Get a list of wiki"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get()
    async getListWiki(@Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.wikiService.getListWiki(project_id);
    }

    @ApiOperation({summary: "Add a wiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createWiki(@Req() req: Request, @Body() createWikiDto: CreateWikiDto): Promise<ResponseModel> {
        return this.wikiService.createWiki(createWikiDto, req['user']);
    }

    @ApiOperation({summary: "Get wiki details"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':wiki_id')
    async detailWiki(@Param('wiki_id', ParseIntPipe) wiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.wikiService.detailWiki(wiki_id, project_id);
    }

    @ApiOperation({summary: "Edit a wiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':wiki_id')
    async updateWiki(@Param('wiki_id', ParseIntPipe) wiki_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() createWikiDto: CreateWikiDto): Promise<ResponseModel> {
        return this.wikiService.updateWiki(createWikiDto, wiki_id, project_id);
    }

    @ApiOperation({summary: "Delete a wiki"})
    @Roles(ROLE.ADMIN)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':wiki_id')
    async deleteWiki(@Param('wiki_id', ParseIntPipe) wiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return this.wikiService.deleteWiki(wiki_id, project_id);
    }
}
