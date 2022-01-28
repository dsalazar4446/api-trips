import { Trip } from './../schemas/trips.schema';
import { Injectable } from "@nestjs/common";
import { DataFactory, Seeder } from "nestjs-seeder";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TripSeeder implements Seeder {
    constructor(@InjectModel(Trip.name) private readonly trip: Model<Trip>) { }

    seed(): Promise<any> {
        const trips = DataFactory.createForClass(Trip).generate(10);
        return this.trip.insertMany(trips);
    }
    drop(): Promise<any> {
        return this.trip.deleteMany({}).exec();
    }

}