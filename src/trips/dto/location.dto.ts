import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class LocationDto {
    @IsNumber()
    @ApiProperty()
    lat:number;
    
    @IsNumber()
    @ApiProperty()
    lon: number;
}