import { sendSuccess, sendError, response} from './../commons/response';
import { TeamProject } from './../models/teamproject.model';
import { Role } from 'src/models/role.model';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: typeof User,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async signUp(UserData: any): Promise<ResponseModel> {
        const foundUser = await this.userRepository.findOne({
            where: {
                [Op.or]: [{email: UserData.email}, {phone: UserData.phone}]
            }
        })
        if (foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_FOUND})
        }

        if (UserData.password !== UserData.repeatPassword) {
            return sendError({code: HttpStatus.FAILED_DEPENDENCY, message: response.PASSWORD_MISMATCH});
        }

        const hashPassword = await bcrypt.hash(UserData.password, 10);

        const createUser = await this.userRepository.create(
            {
                full_name: UserData.full_name,
                email: UserData.email,
                country: UserData.country,
                password: hashPassword,
                phone: UserData.phone,
                role_id: 1
            }
        )

        return sendSuccess({code: HttpStatus.OK, data: createUser});
    }

    async signIn(UserData: any): Promise<any> {
        const foundUser = await this.userRepository.findOne({
            include: [
                {
                    model: TeamProject,
                    required: false,
                    attributes: ['role_id', 'project_id']
                }
            ],
            where: {email: UserData.email}
        });
        
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }

        const comparePassword = await bcrypt.compare(UserData.password, foundUser.password);
        if (comparePassword === false) {
            return sendError({code: HttpStatus.FAILED_DEPENDENCY, message: response.PASSWORD_INCORRECT});
        }
        // let roleProject = [];
        // foundUser.teamprojects.forEach((item) => {
        //     if (!roleProject.includes(item.role_id)) {
        //         roleProject.push(item.role_id);
        //     }
        // })
        const payload = {
            id: foundUser.id,
            // full_name: foundUser.full_name,
            email: foundUser.email,
            // avatar: foundUser.avatar,
            role_id: foundUser.role_id,
            role_project: foundUser.teamprojects
        }

        const tokens = await this.getTokens(payload);
    
        return {...payload, tokens};
    }

    async refreshTokens(userId: number): Promise<any> {
        const user = await this.userRepository.findByPk(userId);
        const payload = {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            avatar: user.avatar,
            phone: user.phone,
            role_id: user.role_id
        }
        const tokens = await this.getTokens(payload);
        return tokens;
    }

    async createUser(UserData: any) : Promise<any> {
        const foundUser = await this.userRepository.findOne({
            where: {
                [Op.or]: [{email: UserData.email}, {phone: UserData.phone}]
            }
        })
        if (foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.EMAIL_PHONE_FOUND});
        }

        const hashPassword = await bcrypt.hash(UserData.password, 10);

        const createUser = await this.userRepository.create({
            full_name: UserData.full_name,
            email: UserData.email,
            country: UserData.country,
            password: hashPassword,
            phone: UserData.phone,
            gender: UserData.gender,
            address: UserData.address,
            role_id: UserData.role_id
        })
        return sendSuccess({code: HttpStatus.OK, message: response.ADD_USER_SUCCESS, data: createUser});
    }

    async getAllUser(): Promise<ResponseModel> {
        const listUser = await this.userRepository.findAll({
            attributes: ['id', 'full_name', 'email', 'country', 'avatar', 'phone', 'gender', 'address'],
            include: [
                {
                    model: Role,
                    required: false,
                    attributes: ['name']
                }
            ]
        });

        return sendSuccess({data: listUser});
    }

    async getDetailUser(userId: number) : Promise<ResponseModel> {
        const foundUser = await this.userRepository.findOne({
            attributes: ['id', 'full_name', 'email', 'country', 'avatar', 'phone', 'gender', 'address'],
            include: [
                {
                    model: Role,
                    required: false,
                    attributes: ['name']
                }
            ],
            where: {
                id: userId
            }
        });
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        return sendSuccess({data: foundUser});
    }

    async updateUser(userId: number, UserData: any): Promise<ResponseModel> {
        const foundUser = await this.userRepository.findByPk(userId);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        const updateUser = await this.userRepository.update(UserData, {where: {id: userId}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_USER_SUCCESS})
    }

    async deleteUser(userId: number): Promise<ResponseModel>{
        const foundUser = await this.userRepository.findByPk(userId);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        await this.userRepository.destroy({where: {id: foundUser.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.DELETE_USER_SUCCESS})
    }

    async changePassword(PasswordData: any, user: any): Promise<ResponseModel> {
        const foundUser = await this.userRepository.findByPk(user.id);
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        if (PasswordData.newPassword !== PasswordData.repeatPassword) {
            return sendError({code: HttpStatus.FAILED_DEPENDENCY, message: response.PASSWORD_MISMATCH});
        }
        const checkPassword = await bcrypt.compare(PasswordData.currentPassword, foundUser.password);
        if (!checkPassword) {
            return sendError({code: HttpStatus.FAILED_DEPENDENCY, message: response.CURRENT_PASSWORD_INCORRECT});
        }
        const hashPassword = await bcrypt.hash(PasswordData.newPassword, 10);
        const updatePassword = await this.userRepository.update({password: hashPassword}, {where: {id: foundUser.id}})
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_PASSWORD_SUCCESS})
    }

    async forgotPassword(UserData: any): Promise<ResponseModel> {
        const foundUser = await this.userRepository.findOne({where: {email: UserData.email}});
        if (!foundUser) {
            return sendError({code: HttpStatus.BAD_REQUEST, message: response.USER_NOT_FOUND});
        }
        if (UserData.newPassword !== UserData.repeatPassword) {
            return sendError({code: HttpStatus.FAILED_DEPENDENCY, message: response.PASSWORD_MISMATCH});
        }
        const hashPassword = await bcrypt.hash(UserData.newPassword, 10);
        const updatePassword = await this.userRepository.update({password: hashPassword}, {where: {id: foundUser.id}});
        return sendSuccess({code: HttpStatus.OK, message: response.EDIT_PASSWORD_SUCCESS})
    }

    async uploadAvatar(file: any, user: any): Promise<ResponseModel> {
        if (!file) {
            throw new Error(response.IMAGE_NOT_FOUND);
        }
        const updateAvatar = await this.userRepository.update({avatar: file.filename}, {where: {id: user.id}})
        return sendSuccess({code: HttpStatus.OK, message: response.UPLOAD_AVATAR_SUCCESS, data: process.env.BASE_URL + file.filename});
    }

    async findUser(userId: number): Promise<User> {
        return this.userRepository.findByPk(userId);
    }

    async getTokens(payload: any) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: 'JWT_ACCESS_SECRET',
                expiresIn: '1h'
            }),
            this.jwtService.signAsync(payload, {
                secret: 'JWT_REFRESH_SECRET',
                expiresIn: '7d'
            })
        ])
        return {
            accessToken, 
            refreshToken
        }
    }    
}
