import { ITrips } from './../interfaces/trips.interface';
import { ReadingDto } from './dto/reading.dto';
import { ITripsFilters } from './../interfaces/trips-filters.interface';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ReadingsDto } from './dto/readings.dto';
import { Trip, TripDocument } from './schemas/trips.schema';
import * as BoundingBox from 'boundingbox'

@Injectable()
export class TripsService {
    baseUrl: string;
    nominatimUrl: string
    constructor(
        @InjectModel(Trip.name) private trip: Model<TripDocument>,
        private http: HttpService,
        private config: ConfigService
    ) {
        this.baseUrl = this.config.get<string>('URL_BASE');
        this.nominatimUrl = this.config.get<string>('NOMINATION_URL');
    }
    /**
     *
     * @param readingsDto
     */
    async createTrips(readingsDto: ReadingsDto) {
        const sorted: Array<ReadingDto> = readingsDto.readings.sort((a,b) => a.time-b.time)
        const start = sorted[0]
        const end = sorted[sorted.length - 1]
        const duration =  end.time - start.time
        const distance = this.getDistance(start.location.lat, start.location.lon, end.location.lat, end.location.lon)
        let overspeedsCount: number = 0;
        readingsDto.readings.forEach((reading) => reading.speed > reading.speedLimit ? overspeedsCount++ : overspeedsCount);
        const boundingBox = new BoundingBox({ minlat: start.location.lat, minlon: start.location.lon, maxlat: end.location.lat, maxlon: end.location.lon });
        const startAddress = await this.getAddress(start.location.lat, start.location.lon);
        const endAddress = await this.getAddress(end.location.lat, end.location.lon);

        const trip:ITrips = {
            start: { time: start.time, lat: start.location.lat, lon: start.location.lon, address: startAddress?.display_name || '' },
            end: { time: end.time, lat: end.location.lat, lon: end.location.lon, address: endAddress?.display_name || '' },
            distance,
            duration,
            overspeedsCount ,
            boundingBox: boundingBox.toGeoJSON().geometry?.coordinates || [],
        }
        const tripModel =new this.trip(trip);
        return await tripModel.save()
    }
    /**
     *
     * @param tripsFilters
     * @returns
     */
    async findTrips(tripsFilters: ITripsFilters) {
        let { start_gte: startGte, start_lte: startLte, distance_gte: distanceGte, limit, offset, page } = tripsFilters
        limit = Number(limit) || 20;
        offset = Number(offset) || 0;
        page = Number(page) || 1;
        let query = {}

        if (startGte && startLte) {
            query['start.time'] = { $gte: Number(startGte), $lte: Number(startLte)}
        } else {
            if (startGte)
                query['start.time'] = { $gte: Number(startGte)}
            if (startLte)
                query['start.time'] = { $lte: Number(startLte) }
        }
        if (distanceGte)
            query['distance'] = { $lte: Number(distanceGte) }

            console.log(query);
        const data = await this.trip.find().where(query).sort({ _id: 1 }).limit(limit).skip(offset)
        const count = await this.trip.countDocuments();
        return {
            data,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        }
    }

    /**
     * @param lat
     * @param lon
     * @returns Promise
     */

    getAddress(lat: number, lon: number): Promise<any> {
        const url = `${this.nominatimUrl}&lat=${lat}&lon=${lon}`
        const $request = this.http.get(url).pipe(
            map(resp => resp.data),
            catchError(err => {
                throw new Error('Imposible obtener la direccion')
            })
        )
        return firstValueFrom($request)
    }

    /**
     *
     * @param lat1
     * @param lon1
     * @param lat2
     * @param lon2
     * @returns
     */
    getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {

        const rlat1 = Math.PI * lat1 / 180
        const rlat2 = Math.PI * lat2 / 180
        const theta = lon1 - lon2
        const rtheta = Math.PI * theta / 180
        let dist = Math.sin(rlat1) * Math.sin(rlat2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.cos(rtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        return dist
    }
}
