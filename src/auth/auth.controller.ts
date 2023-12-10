import { RefreshTokenGuard } from './common/refreshToken.guard';
import { AuthService } from './auth.service';
import { User } from 'src/models/user.model';
import { SignUpUserDto, SignInUserDto } from './../user/user.dto';
import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from 'src/commons/constant';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @ApiOperation({summary: 'User account registration'})
    @Post('signUp')
    @ApiConsumes('application/x-www-form-urlencoded')
    async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<ResponseModel> {
        return this.authService.signUp(signUpUserDto);
    }

    @ApiOperation({summary: 'User login'})
    @Post('signIn')
    @ApiConsumes('application/x-www-form-urlencoded')
    async signIn(@Body() signInUserDto: SignInUserDto): Promise<ResponseModel> {
        return this.authService.signIn(signInUserDto);
    }

    @ApiOperation({summary: "Refresh tokens"})
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshTokens(@Req() req: Request): Promise<ResponseModel> {
        return this.authService.refreshTokens(req['user'].id);
    }
}
