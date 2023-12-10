import { ProjectService } from './../project/project.service';
import { UserService } from './../user/user.service';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Wiki } from 'src/models/wiki.model';
import { SubWiki } from 'src/models/subwiki.model';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class WikiService {
    constructor(
        @Inject('WIKI_REPOSITORY')
        private readonly wikiRepository: typeof Wiki,
        private readonly userService: UserService,
        private readonly projectService: ProjectService
    ) {}

    async getListWiki(project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const listWiki = await this.wikiRepository.findAll({
            attributes: ['id', 'title', 'created_at'],
            include: [
                {
                    model: SubWiki,
                    required: false,
                    attributes: ['id', 'title', 'created_at']
                }
            ],
            where: {project_id: project_id}
        });

        return sendSuccess({data: listWiki});
    }

    async createWiki(WikiData: any, user: any): Promise<ResponseModel> {
        const foundWiki = await this.wikiRepository.findOne({where: {title: WikiData.title}});
        if (foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_FOUND});
        }
        const foundProject = await this.projectService.findProject(WikiData.project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }
        const createWiki = await this.wikiRepository.create({
            user_id: user.id,
            ...WikiData
        });
        return sendSuccess({code: HttpStatus.OK, data: createWiki});
    }

    async detailWiki(wikiId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWiki = await this.wikiRepository.findOne({where: {id: wikiId, project_id: project_id}});
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND});
        }
        return sendSuccess({data: foundWiki});
    }

    async updateWiki(WikiData: any, wikiId: number, project_id: number): Promise<ResponseModel> {
        const project = await this.projectService.findProject(project_id);
        const foundProject = await this.projectService.findProject(WikiData.project_id);
        if (!project || !foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWiki = await this.wikiRepository.findOne({where: {id: wikiId, project_id: project_id}});
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND});
        }

        const updateWiki = await this.wikiRepository.update(WikiData, {where: {id: foundWiki.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_WIKI_SUCCESS});
    }

    async deleteWiki(wikiId: number, project_id: number): Promise<ResponseModel> {
        const foundProject = await this.projectService.findProject(project_id);
        if (!foundProject) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.PROJECT_NOT_FOUND});
        }

        const foundWiki = await this.wikiRepository.findOne({where: {id: wikiId, project_id: project_id}});
        if (!foundWiki) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.WIKI_NOT_FOUND});
        }
        
        await this.wikiRepository.destroy({where: {id: wikiId}});

        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_WIKI_SUCCESS});
    }

    async findWiki(wikiId: number): Promise<Wiki> {
        return await this.wikiRepository.findByPk(wikiId);
    }
}
