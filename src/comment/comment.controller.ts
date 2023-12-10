import { RolesProjectGuard } from './../auth/rolesproject.guard';
import { Comment } from './../models/comment.model';
import { CreateCommentSubWikiDto, CreateCommentWikiDto, CreateCommentWorkItemDto, UpdateCommentWikiDto } from './comment.dto';
import { AccessTokenGuard } from './../auth/common/accessToken.guard';
import { CommentService } from './comment.service';
import { Controller, Get, Param, UseGuards, ParseIntPipe, Body, Req, Post, Patch, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {}

    @ApiOperation({summary: 'Comment on wiki'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post('/wiki')
    async createCommentWiki(@Req() req: Request, @Body() createCommentWikiDto: CreateCommentWikiDto): Promise<ResponseModel> {
        return await this.commentService.createCommentWiki(createCommentWikiDto, req['user']);
    }

    @ApiOperation({summary: 'Comment on sub wiki'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post('/sub-wiki')
    async createCommentSubWiki(@Req() req: Request, @Body() createCommentSubWikiDto: CreateCommentSubWikiDto): Promise<ResponseModel> {
        return await this.commentService.createCommentSubWiki(createCommentSubWikiDto, req['user']);
    }

    @ApiOperation({summary: 'Comment on work item'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post('/work-item')
    async createCommentWorkItem(@Req() req: Request, @Body() createCommentWorkItemDto: CreateCommentWorkItemDto): Promise<ResponseModel> {
        return await this.commentService.createCommentWorkItem(createCommentWorkItemDto, req);
    }

    @ApiOperation({summary: 'Get a list of comments by wiki'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get('/wiki/:wiki_id')
    async getCommentByWiki(@Param('wiki_id', ParseIntPipe) wiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.commentService.getCommentByWiki(wiki_id, project_id);
    }

    @ApiOperation({summary: 'Get a list of comments by sub wiki'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get('/sub-wiki/:subwiki_id')
    async getCommentBySubWiki(@Param('subwiki_id', ParseIntPipe) subwiki_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.commentService.getCommentBySubWiki(subwiki_id, project_id);
    }

    @ApiOperation({summary: 'Edit a comment'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch('/wiki/:comment_id')
    async updateCommentWiki(@Param('comment_id', ParseIntPipe) comment_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateCommentWikiDto: UpdateCommentWikiDto): Promise<ResponseModel> {
        return await this.commentService.updateCommentWiki(updateCommentWikiDto, comment_id, project_id);
    }

    @ApiOperation({summary: 'Delete a comment'})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Delete(':comment_id')
    async deleteComment(@Param('comment_id', ParseIntPipe) comment_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.commentService.deleteComment(comment_id, project_id);
    }
}
