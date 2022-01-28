import { ICoord } from "./coord.interface";
import { ILocation } from "./location";

export interface ITrips {
    id?: string;
    start: ICoord;
    end: ICoord;
    distance: number;
    duration: number;
    overspeedsCount: number;
    boundingBox: Array<ILocation>
}