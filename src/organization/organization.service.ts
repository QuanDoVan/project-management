import { Project } from 'src/models/project.model';
import { Organization } from 'src/models/organization.model';
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { response, sendError, sendSuccess } from 'src/commons/response';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class OrganizationService {
    constructor(
        @Inject('ORGANIZATION_REPOSITORY')
        private readonly organizationRepository: typeof Organization,
    ) {}

    async createOrganization(OrganizationData: any): Promise<ResponseModel> {
        const foundOrganization = await this.organizationRepository.findOne({where: {name: OrganizationData.name}});
        if (foundOrganization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_FOUND})
        }
        const createOrganization = await this.organizationRepository.create(OrganizationData);
        return sendSuccess({code: HttpStatus.OK, data: createOrganization})
    }

    async getListOrganization(): Promise<ResponseModel> {
        const listOrganization = await this.organizationRepository.findAll();
        return sendSuccess({data: listOrganization});
    }
    
    async getListProject(id: number): Promise<ResponseModel> {
        const organization = await this.organizationRepository.findByPk(id);
        if (!organization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_NOT_FOUND})
        }
        const listProjects = await this.organizationRepository.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: Project,
                    required: false,
                    attributes: ['id', 'name', 'description', 'date_created']
                }
            ],
            where: [
                {id: id}
            ]
        })
        return sendSuccess({data: listProjects});
    }

    async getDetailOrganization(id: number): Promise<ResponseModel> {
        const organization = await this.organizationRepository.findByPk(id);
        if (!organization) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.ORGANIZATION_NOT_FOUND})
        }
        return sendSuccess({data: organization});
    }

    async findOrganization(id: number): Promise<Organization> {
        return await this.organizationRepository.findByPk(id);
    }
}
