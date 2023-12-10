import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentWikiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

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

export class CreateCommentSubWikiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    subwiki_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}

export class CreateCommentWorkItemDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    workitem_id: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    project_id: number;
}

export class UpdateCommentWikiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content: string;
}