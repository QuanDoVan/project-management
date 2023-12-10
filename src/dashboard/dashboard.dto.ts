import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDashboardDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    @ApiProperty()
    project_id: number;
}