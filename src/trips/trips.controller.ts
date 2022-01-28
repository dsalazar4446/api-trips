import { TripsFilters } from './classes/trips-filters';
import { ITripsFilters } from './../interfaces/trips-filters.interface';
import { TripsService } from './trips.service';
import { Controller, HttpCode, Post, HttpStatus, Body, Query, Get } from '@nestjs/common';
import { ReadingsDto } from './dto/readings.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('trips')
@ApiTags('Trips')
export class TripsController {
    constructor( private tripService: TripsService ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() readingsDto: ReadingsDto) {
        return this.tripService.createTrips(readingsDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiQuery({type: TripsFilters})
    find(@Query() filters: ITripsFilters) {
        return this.tripService.findTrips(filters);
    }
}
