import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseModel } from 'src/commons/constant';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(UserData: any): Promise<ResponseModel> {
        return this.userService.signUp(UserData);
    }

    async signIn(UserData: any): Promise<ResponseModel> {
        return this.userService.signIn(UserData);
    }

    async refreshTokens(userId: number) : Promise<ResponseModel> {
        return this.userService.refreshTokens(userId);
    }
}
