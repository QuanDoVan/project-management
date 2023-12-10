import { Organization } from 'src/models/organization.model';
import { CreateOrganizationDto } from './organization.dto';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { OrganizationService } from './organization.service';
import { Body, Controller, Get, Param, Post, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('organization')
@ApiBearerAuth()
@Controller('organization')
export class OrganizationController {
    constructor(
        private readonly organizationService: OrganizationService
    ) {}

    @ApiOperation({summary: "Add a new organization"})
    @ApiConsumes('application/x-www-form-urlencoded')
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post()
    async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto): Promise<ResponseModel> {
        return this.organizationService.createOrganization(createOrganizationDto);
    }

    @ApiOperation({summary: "Get a list of organization"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    async getListOrganization():Promise<ResponseModel> {
        return this.organizationService.getListOrganization();
    }

    @ApiOperation({summary: "Get a list of projects by organization"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':id/project')    
    async getListProject(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.organizationService.getListProject(id);
    }

    @ApiOperation({summary: "Get organization details"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':id')
    async getDetailOrganization(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.organizationService.getDetailOrganization(id);
    }
}
