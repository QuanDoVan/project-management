import { Wiki } from './../models/wiki.model';
import { ProjectService } from './../project/project.service';
import { HistoryService } from './../history/history.service';
import { WorkitemService } from './../workitem/workitem.service';
import { response, sendError, sendSuccess } from './../commons/response';
import { SubwikiService } from './../subwiki/subwiki.service';
import { User } from './../models/user.model';
import { WikiService } from './../wiki/wiki.service';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { Comment } from 'src/models/comment.model';
import { Project } from 'src/models/project.model';
import { SubWiki } from 'src/models/subwiki.model';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class CommentService {
    constructor(
        @Inject('COMMENT_REPOSITORY')
        private readonly commentRepository: typeof Comment,
        private readonly wikiService: WikiService,
        private readonly subWikiService: SubwikiService,
        private readonly workItemService: WorkitemService,
        private readonly historyService: HistoryService,
        private readonly projectService: ProjectService
    ) {}

    async getCommentByWiki(wiki_id: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWiki = await this.wikiService.findWiki(wiki_id);
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND});
        }

        const getComment = await this.commentRepository.findAll({
            attributes: ['id', 'content', 'created_at'],
            include: [
                {
                    model: User,
                    required: false,
                    attributes: ['id', 'full_name', 'email']
                }, {
                    model: Wiki,
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: Project,
                            required: true,
                            attributes: [],
                            where: {id: project_id}
                        }
                    ]
                }
            ],
            where: {wiki_id: wiki_id}
        });

        return sendSuccess({data: getComment});
    }

    async getCommentBySubWiki(subwiki_id: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSubWiki = await this.subWikiService.findSubWiki(subwiki_id);
        if (!foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND});
        }

        const getComment = await this.commentRepository.findAll({
            attributes: ['id', 'content', 'created_at'],
            include: [
                {
                    model: User,
                    required: false,
                    attributes: ['id', 'full_name', 'email']
                }, {
                    model: SubWiki,
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: Wiki,
                            required: true,
                            attributes: [],
                            include: [
                                {
                                    model: Project,
                                    required: true,
                                    attributes: [],
                                    where: {id: project_id}
                                }
                            ]
                        }
                    ]
                    
                }
            ],
            where: {subwiki_id: subwiki_id}
        });

        return sendSuccess({data: getComment});
    }

    async createCommentWiki(CommentWikiData: any, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(CommentWikiData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWiki = await this.wikiService.findWiki(CommentWikiData.wiki_id);
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND})
        }
        const createComment = await this.commentRepository.create({
            user_id: user.id,
            ...CommentWikiData
        })
        return sendSuccess({code: HttpStatus.OK, data: createComment})
    }

    async createCommentSubWiki(CommentSubWikiData: any, user: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(CommentSubWikiData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSubWiki = await this.subWikiService.findSubWiki(CommentSubWikiData.subwiki_id);
        if (!foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND})
        }
        const createComment = await this.commentRepository.create({
            user_id: user.id,
            ...CommentSubWikiData
        })
        return sendSuccess({code: HttpStatus.OK, data: createComment})
    }

    async createCommentWorkItem(CommentWorkItemData: any, req: any): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(CommentWorkItemData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWorkItem = await this.workItemService.findWorkItem(CommentWorkItemData.workitem_id);
        if (!foundWorkItem) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WORK_ITEM_NOT_FOUND})
        }

        const createComment = await this.commentRepository.create({
            user_id: req.user.id,
            ...CommentWorkItemData
        })

        const createHistory = await this.historyService.createHistory({
            status: `comment`,
            user_id: req.user.id,
            workitem_id: foundWorkItem.id,
        })

        return sendSuccess({code: HttpStatus.OK, data: createComment})
    }

    async updateCommentWiki(CommentWikiData: any, commentId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundComment = await this.commentRepository.findByPk(commentId);
        if (!foundComment) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.COMMENT_NOT_FOUND})
        }
        const updateComment = await foundComment.update(CommentWikiData, {where: {id: foundComment.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_COMMENT_SUCCESS})
    }

    async updateCommentSubWiki(CommentSubWikiData: any, commentId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        
        const foundComment = await this.commentRepository.findByPk(commentId);
        if (!foundComment) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.COMMENT_NOT_FOUND})
        }
        const updateComment = await foundComment.update(CommentSubWikiData, {where: {id: foundComment.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_COMMENT_SUCCESS})
    }

    async deleteComment(commentId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundComment = await this.commentRepository.findByPk(commentId);
        if (!foundComment) {
            return sendError({code: HttpStatus.BAD_GATEWAY, message: response.COMMENT_NOT_FOUND})
        }
        await this.commentRepository.destroy({where: {id: commentId}});
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_COMMENT_SUCCESS})
    }
}
