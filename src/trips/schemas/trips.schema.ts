import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Coord } from "../classes/coord";
import { LocationDto } from "../dto/location.dto";
import { Factory } from "nestjs-seeder";


export type TripDocument = Trip & Document;

@Schema()
export class Trip {
    @Factory(faker => ({
        time: faker.random.number(),
        lat: Number(faker.address.latitude()),
        lon: Number(faker.address.longitude()),
        address: faker.address.streetAddress(true)
    }))
    @Prop({required: true})
    @ApiProperty()
    start: Coord;

    @Factory(faker => ({
        time: faker.random.number(),
        lat: Number(faker.address.latitude()),
        lon: Number(faker.address.longitude()),
        address: faker.address.streetAddress(true)
    }))
    @Prop()
    @ApiProperty()
    end: Coord;

    @Factory(faker => faker.random.number())
    @Prop()
    @ApiProperty({
        required: true,
        type: Number
    })
    distance: number;

    @Factory(faker => faker.random.number())
    @Prop()
    @ApiProperty({
        required: true,
        type: Number
    })
    duration: number;

    @Factory(faker => faker.random.number())
    @Prop()
    @ApiProperty({
        required: true,
        type: Number
    })
    overspeedsCount: number;

    @Factory(faker => {
        const array =[]
        for(let i= 0; i < 10;i++) {{
            array.push({
                lat: Number(faker.address.latitude()),
                lon: Number(faker.address.longitude()),
            })
        }}
        return array
    })
    @Prop()
    @ApiProperty({ type: LocationDto })
    boundingBox: Array<LocationDto>;
}

export const TripSchema = SchemaFactory.createForClass(Trip);