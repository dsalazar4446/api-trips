import { Trip, TripSchema } from './trips/schemas/trips.schema';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { seeder } from "nestjs-seeder";
import { MongooseConfigService } from "./config/mongoose-config/mongoose-config.service";
import { TripSeeder } from './trips/seeder/trip.seeder';

seeder({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
        }),
        MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    ]
})
.run([TripSeeder])