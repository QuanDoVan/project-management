import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateTeamProjectDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({enum: [3, 4, 5]})
    role_id: number;
}