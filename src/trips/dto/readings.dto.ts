import { IsArray, MinLength } from "class-validator"
import { ReadingDto } from "./reading.dto"

export class ReadingsDto {
    @IsArray()
    readings: Array<ReadingDto>
}