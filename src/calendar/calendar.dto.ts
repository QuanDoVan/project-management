import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCalendarDto {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    workitem_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    hours_use: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    minutes_use: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default: new Date().toISOString().split('T')[0]})
    time: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({enum: ['Development', 'Operations', 'Sales', 'Testing', 'Times Off', 'Training', 'Meeting', 'Data Science']})
    worktype: string

    @IsString()
    @ApiProperty({required: false})
    note: string

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}