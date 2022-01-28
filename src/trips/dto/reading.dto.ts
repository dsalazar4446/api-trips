import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { LocationDto } from "./location.dto";

export class ReadingDto {
    @IsNumber()
    @ApiProperty()
    time: number

    @ApiProperty()
    location: LocationDto
    
    @ApiProperty()
    @IsNumber()
    speed: number

    @ApiProperty()
    @IsNumber()
    speedLimit: number
}