import { IsString, MinLength, IsUUID, IsOptional } from 'class-validator';

export class UpdateCarDTO {
    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly brand?: string;

    @IsString()
    @IsOptional()
    readonly model?: string;
}