import { ApiPropertyOptional } from "@nestjs/swagger"

export class TripsFilters {
    @ApiPropertyOptional()
    start_gte: number
    @ApiPropertyOptional()
    start_lte: number
    @ApiPropertyOptional()
    distance_gte: number
    @ApiPropertyOptional()
    limit: number
    @ApiPropertyOptional()
    offset: number
    @ApiPropertyOptional()
    page: number
}