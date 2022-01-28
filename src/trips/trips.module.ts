import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/trips.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{name: Trip.name, schema: TripSchema}])
  ],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
