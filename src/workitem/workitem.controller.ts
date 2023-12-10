import { storage } from './../storageFiles.config';
import { WorkItem } from './../models/workitem.model';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { WorkitemService } from './workitem.service';
import { Body, Controller, Get, Param, Post, Req, UseGuards, ParseIntPipe, Query, ValidationPipe, Patch, Delete, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, UploadedFile } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { CreateWorkItemDto, StatusWorkItemDto, TitleWorkItemDto, UpdateWorkItemDto, StorageObjectDto } from './workitem.dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles, RolesProject } from 'src/auth/roles.decorator';
import { ROLE, ResponseModel } from 'src/commons/constant';
import { RolesGuard } from 'src/auth/roles.guard';
import { RolesProjectGuard } from './../auth/rolesproject.guard';

@ApiTags('workitems')
@ApiBearerAuth()
@Controller('work-item')
export class WorkitemController {
    constructor(
        private readonly workItemService: WorkitemService
    ) {}
    
    @ApiOperation({summary: "Filter work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    // @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('filter')
    @ApiQuery({name: 'type', required: false, enum: ['bug', 'epic', 'issue', 'task']})
    @ApiQuery({name: 'status', required: false, enum: ['new', 'active', 'pending', 'resolved', 'under review', 'closed', 'removed']})
    @ApiQuery({name: 'area', required: false})
    async filterWorkItem(
        @Query('type') type: string,
        @Query('status') status: string,
        @Query('area') area: string,
    ): Promise<ResponseModel> {
        return await this.workItemService.filterWorkItem(type, status, area);
    }

    @ApiOperation({summary: "Add a work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createUserStory(@Req() req: Request, @Body() createWorkItemDto: CreateWorkItemDto): Promise<ResponseModel> {
        return this.workItemService.createWorkItem(createWorkItemDto, req);
    }

    @ApiOperation({summary: "Get a list of work item by project"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get('/project/:project_id')
    async getListWorkItem(@Param('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.workItemService.getListWorkItem(project_id);
    }

    @ApiOperation({summary: "Get work item details"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Get(':workitem_id')
    async getDetailWorkItem(@Param('workitem_id', ParseIntPipe) workitem_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.workItemService.getDetailWorkItem(workitem_id, project_id);
    } 

    @ApiOperation({summary: "Edit a work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':workitem_id')
    async updateWorkItem(@Req() req: Request, @Param('workitem_id', ParseIntPipe) workitem_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() updateWorkItemDto: UpdateWorkItemDto): Promise<ResponseModel> {
        return await this.workItemService.updateWorkItem(updateWorkItemDto, req, workitem_id, project_id);
    }
    
    @ApiOperation({summary: "Change status a work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':workitem_id/status')
    async updateStatus(@Req() req: Request, @Param('workitem_id', ParseIntPipe) workitem_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() statusWorkItemDto: StatusWorkItemDto): Promise<ResponseModel> {
        return await this.workItemService.updateStatus(statusWorkItemDto, workitem_id, project_id, req);
    }

    @ApiOperation({summary: "Change title a work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':workitem_id/title')
    async updateTitle(@Req() req: Request, @Param('workitem_id', ParseIntPipe) workitem_id: number, @Query('project_id', ParseIntPipe) project_id: number, @Body() titleWorkItemDto: TitleWorkItemDto): Promise<ResponseModel> {
        return await this.workItemService.changeTitle(titleWorkItemDto, workitem_id, project_id, req);
    }

    @ApiOperation({summary: "Delete a work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Delete(':workitem_id')
    async deleteWorkItem(@Req() req: Request, @Param('workitem_id', ParseIntPipe) workitem_id: number, @Query('project_id', ParseIntPipe) project_id: number): Promise<ResponseModel> {
        return await this.workItemService.deleteWorkItem(workitem_id, project_id, req);
    }

    @ApiOperation({summary: "Upload file of work item"})
    @Roles(ROLE.ADMIN, ROLE.CONTRIBUTOR)
    @RolesProject(ROLE.PROJECT_ADMIN, ROLE.PROJECT_USER)
    @UseGuards(AccessTokenGuard, RolesGuard, RolesProjectGuard)
    @Patch(':workitem_id/file')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("file", {storage}))
    async uploadFile(
        @Req() req: Request,
        @Param('workitem_id', ParseIntPipe) workitem_id: number,
        @Query('project_id', ParseIntPipe) project_id: number,
        @Body() data: StorageObjectDto, 
        @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'jpg|jpeg|png|docx|pdf',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File) {
        return await this.workItemService.uploadFilesWorkItem(file, workitem_id, project_id, req);
    }
}
