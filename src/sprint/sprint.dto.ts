import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSprintDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({default: new Date().toISOString().split('T')[0]})
    start_time: Date;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({default: new Date().toISOString().split('T')[0]})
    end_time: Date;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    @ApiProperty()
    project_id: number;
}