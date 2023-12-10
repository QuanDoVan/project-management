import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTeamWorkDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    workitem_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}