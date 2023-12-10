import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSubWikiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    wiki_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}

export class UpdateSubWikiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    wiki_id: number;
}