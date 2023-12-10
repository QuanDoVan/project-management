import { sendError, sendSuccess, response } from './../commons/response';
import { WikiService } from './../wiki/wiki.service';
import { SubWiki } from './../models/subwiki.model';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Wiki } from 'src/models/wiki.model';
import { Project } from 'src/models/project.model';
import { ProjectService } from 'src/project/project.service';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class SubwikiService {
    constructor(
        @Inject('SUBWIKI_REPOSITORY')
        private readonly subWikiRepository: typeof SubWiki,
        private readonly wikiService: WikiService,
        private readonly projectService: ProjectService
    ) {}

    async getListSubWiki(project_id: number): Promise<ResponseModel> {
        const listSubWiki = await this.subWikiRepository.findAll({
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
        });
        return sendSuccess({data: listSubWiki});
    }

    async createSubWiki(SubWikiData: any, user: any): Promise<ResponseModel> {
        const foundSubWiki = await this.subWikiRepository.findOne({where: {title: SubWikiData.title}});
        if (foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWWIKI_FOUND})
        }
        const foundWiki = await this.wikiService.findWiki(SubWikiData.wiki_id);
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND})
        }
        const createSubWiki = await this.subWikiRepository.create({
            user_id: user.id,
            ...SubWikiData
        });
        return sendSuccess({code: HttpStatus.OK, data: createSubWiki});
    }

    async detailSubWiki(subwikiId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSubWiki = await this.subWikiRepository.findOne({
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
            ],
            where: {id: subwikiId}
        });
        if (!foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND})
        }
        return sendSuccess({data: foundSubWiki});
    }

    async updateSubWiki(SubWikiData: any, subwikiId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSubWiki = await this.subWikiRepository.findOne({
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
            ],
            where: {id: subwikiId}
        });
        if (!foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND})
        }
        const foundWiki = await this.wikiService.findWiki(SubWikiData.wiki_id);
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND})
        }
        const updateSubWiki = await this.subWikiRepository.update(SubWikiData, {where: {id: foundSubWiki.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_SUBWIKI_SUCCESS});
    }

    async deleteSubWiki(subwikiId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundSubWiki = await this.subWikiRepository.findOne({
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
            ],
            where: {id: subwikiId}
        });
        if (!foundSubWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.SUBWIKI_NOT_FOUND})
        }
        await this.subWikiRepository.destroy({where: {id: subwikiId}});
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_SUBWIKI_SUCCESS});
    }

    async findSubWiki(subwikiId: number): Promise<SubWiki> {
        return await this.subWikiRepository.findByPk(subwikiId);
    }
}
