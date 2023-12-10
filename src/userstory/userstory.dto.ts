import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserStoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default: 'new'})
    status: string;

    @IsString()
    @ApiProperty({default: 'new'})
    reason: string;

    @IsString()
    @ApiProperty({required: false})
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({enum: [1, 2, 3, 4, 5]})
    priority: number;

    @IsString()
    @ApiProperty({required: false})
    activity: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    sprint_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}

export class UpdateUserStoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: ['new', 'active', 'pending', 'resolved', 'under review', 'closed', 'removed']})
    status: string;

    @IsString()
    @ApiProperty({required: false})
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({enum: [1, 2, 3, 4, 5]})
    priority: number;

    @IsString()
    @ApiProperty({required: false})
    activity: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}

export class UpdateStatusUserStoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: ['new', 'active', 'pending', 'resolved', 'under review', 'closed', 'removed']})
    status: string;
}

export class UpdateBackLogUserStoryDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    backlog_id: number;
}