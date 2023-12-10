import { storage } from './../storage.config';
import { CreateUserDto, PasswordUserDto, UpdateUserDto, ForgotPasswordUserDto, StorageObjectDto } from './user.dto';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';
import { Controller, Get, UseGuards, Req, Body, Post, Param, ParseIntPipe, Patch, Delete, UploadedFile, ParseFilePipeBuilder, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags} from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/common/accessToken.guard';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLE, ResponseModel } from 'src/commons/constant';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @ApiOperation({summary: "Get a list of users"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    async getListUser(): Promise<ResponseModel> {
        return this.userService.getAllUser();
    }

    @ApiOperation({summary: "Add a new user"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseModel>{
        return this.userService.createUser(createUserDto);
    }

    @ApiOperation({summary: "Update avatar"})
    @UseGuards(AccessTokenGuard)
    @Post('avatar')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor("file", {storage}))
    async uploadAvatar(
        @Req() req: Request,
        @Body() data: StorageObjectDto, 
        @UploadedFile(
        new ParseFilePipeBuilder()
            .addFileTypeValidator({
                fileType: 'jpg|jpeg',
            })
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) file: Express.Multer.File) {
        return this.userService.uploadAvatar(file, req['user']);
    }


    @ApiOperation({summary: "Change personal password"})
    @UseGuards(AccessTokenGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch("/changePassword")
    async changePassword (@Req() req: Request, @Body() passwordUserDto: PasswordUserDto): Promise<ResponseModel> {
        return this.userService.changePassword(passwordUserDto, req['user']);
    }

    @ApiOperation({summary: "Forgot password"})
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch('/forgotPassword')
    async forgotPassword(@Body() forgotPasswordUserDto: ForgotPasswordUserDto): Promise<ResponseModel> {
        return this.userService.forgotPassword(forgotPasswordUserDto);
    }

    @ApiOperation({summary: "Get user details"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':id')
    async getDetailUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.userService.getDetailUser(id);
    }

    @ApiOperation({summary: "Edit user information"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @ApiConsumes('application/x-www-form-urlencoded')
    @Patch(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<ResponseModel>{
        return this.userService.updateUser(id, updateUserDto);
    }

    @ApiOperation({summary: "Delete user information"})
    @Roles(ROLE.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ResponseModel> {
        return this.userService.deleteUser(id);
    }
}
