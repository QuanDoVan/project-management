import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, IsNumber } from "class-validator";
import { Type } from 'class-transformer';

export class SignUpUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    repeatPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;
}

export class SignInUserDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: true, default: 'admin@gmail.com'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: true, default: '123456' })
    password: string;
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: ['Nam', 'Nữ']})
    gender: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({enum: [1, 2, 3, 4, 5]})
    role_id: number;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    country: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;

    @IsString()
    @ApiProperty({enum: ['Nam', 'Nữ']})
    gender: string;

    @IsString()
    @ApiProperty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({enum: [1, 2, 3, 4, 5]})
    role_id: number;
}

export class PasswordUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currentPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    repeatPassword: string;
}

export class ForgotPasswordUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    repeatPassword: string;
}

export class StorageObjectDto {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File
}