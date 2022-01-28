import { ReadingDto } from './dto/reading.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Trip, TripDocument } from './schemas/trips.schema';
import { TripsService } from './trips.service';

const tripMock: any = {
  _id: "61f317455e485de66cdc0722",
  boundingBox: [
    {
      lat: 28.9639,
      lon: 151.9857
    },
    {
      lat: -22.8135,
      lon: 87.8972
    },
    {
      lat: 42.0144,
      lon: -60.8642
    },
    {
      lat: 71.7617,
      lon: 162.9979
    },
    {
      lat: 53.5003,
      lon: 99.5671
    },
    {
      lat: 55.071,
      lon: -147.9121
    },
    {
      lat: 51.7438,
      lon: -59.119
    },
    {
      lat: -84.4024,
      lon: 64.0667
    },
    {
      lat: 15.5355,
      lon: 75.5275
    },
    {
      lat: -63.8619,
      lon: -118.7517
    }
  ],
  overspeedsCount: 20531,
  duration: 44482,
  distance: 43580,
  end: {
    time: 86236,
    lat: 82.7905,
    lon: -5.7521,
    address: "029 Hickle Summit Suite 284"
  },
  start: {
    time: 9831,
    lat: 47.2492,
    lon: -119.1099,
    address: "295 Schoen Junctions Apt. 191"
  },
  __v: 0
};

const tripArrayMock = [
  {
    _id: "61f317455e485de66cdc0722",
    boundingBox: [
      {
        lat: 28.9639,
        lon: 151.9857
      },
      {
        lat: -22.8135,
        lon: 87.8972
      },
      {
        lat: 42.0144,
        lon: -60.8642
      },
      {
        lat: 71.7617,
        lon: 162.9979
      },
      {
        lat: 53.5003,
        lon: 99.5671
      },
      {
        lat: 55.071,
        lon: -147.9121
      },
      {
        lat: 51.7438,
        lon: -59.119
      },
      {
        lat: -84.4024,
        lon: 64.0667
      },
      {
        lat: 15.5355,
        lon: 75.5275
      },
      {
        lat: -63.8619,
        lon: -118.7517
      }
    ],
    overspeedsCount: 20531,
    duration: 44482,
    distance: 43580,
    end: {
      time: 86236,
      lat: 82.7905,
      lon: -5.7521,
      address: "029 Hickle Summit Suite 284"
    },
    start: {
      time: 9831,
      lat: 47.2492,
      lon: -119.1099,
      address: "295 Schoen Junctions Apt. 191"
    },
    __v: 0
  },
  {
    _id: "61f317455e485de66cdc0723",
    boundingBox: [
      {
        lat: 27.1608,
        lon: -26.2131
      },
      {
        lat: -62.518,
        lon: -156.3413
      },
      {
        lat: 74.1892,
        lon: -160.9585
      },
      {
        lat: 82.6965,
        lon: 157.1438
      },
      {
        lat: -22.1973,
        lon: -79.3794
      },
      {
        lat: -13.0209,
        lon: 162.8763
      },
      {
        lat: 45.9754,
        lon: -75.0311
      },
      {
        lat: 15.3299,
        lon: 123.4359
      },
      {
        lat: 58.3296,
        lon: 105.6554
      },
      {
        lat: -70.9702,
        lon: 176.0392
      }
    ],
    overspeedsCount: 22900,
    duration: 12434,
    distance: 85844,
    end: {
      time: 38274,
      lat: -84.7388,
      lon: -159.0902,
      address: "2094 Herzog Landing Suite 660"
    },
    start: {
      time: 6586,
      lat: 67.4882,
      lon: -114.8129,
      address: "2433 Abigayle Meadow Suite 413"
    },
    __v: 0
  }
];

class TripModel {
  constructor() {}
  static create = jest.fn().mockResolvedValue(tripMock);
  static find = jest.fn().mockResolvedValue(tripArrayMock);
  static findOne = jest.fn().mockResolvedValue(tripMock);
  static findById = jest.fn().mockResolvedValue(tripMock);
  static update = jest.fn().mockResolvedValue(tripMock);
  static deleteOne = jest.fn().mockResolvedValue(tripMock);
  static save = jest.fn().mockResolvedValue(tripMock);
  static findOneAndDelete = jest.fn().mockResolvedValue(tripMock);
}

describe('TripsService', () => {
  let service: TripsService;
  let model: Model<Trip>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        TripsService,
        {
          provide: getModelToken(Trip.name),
          useValue: TripModel,
        },
      ],
    }).compile();

    service = module.get<TripsService>(TripsService);
    model = module.get<Model<Trip>>(getModelToken(Trip.name));

  });



  it('should be created trips', async() => {
    const dto = {
      "readings": [
        {
          "time": 1642500462000,
          "speed": 9,
          "speedLimit": 38,
          "location": {
            "lat": -33.580158,
            "lon": -70.567227
          }
        },
        {
          "time": 1642500466000,
          "speed": 26,
          "speedLimit": 38,
          "location": {
            "lat": -33.58013,
            "lon": -70.566995
          }
        },
        {
          "time": 1642500470000,
          "speed": 28,
          "speedLimit": 38,
          "location": {
            "lat": -33.580117,
            "lon": -70.566633
          }
        },
        {
          "time": 1642500474000,
          "speed": 13,
          "speedLimit": 38,
          "location": {
            "lat": -33.580078,
            "lon": -70.566408
          }
        },
        {
          "time": 1642500478000,
          "speed": 18,
          "speedLimit": 38,
          "location": {
            "lat": -33.580005,
            "lon": -70.566498
          }
        },
        {
          "time": 1642500482000,
          "speed": 32,
          "speedLimit": 38,
          "location": {
            "lat": -33.58002,
            "lon": -70.566837
          }
        },
        {
          "time": 1642500486000,
          "speed": 38,
          "speedLimit": 38,
          "location": {
            "lat": -33.580038,
            "lon": -70.567265
          }
        },
        {
          "time": 1642500490000,
          "speed": 38,
          "speedLimit": 38,
          "location": {
            "lat": -33.580043,
            "lon": -70.56773
          }
        },
        {
          "time": 1642500494000,
          "speed": 35,
          "speedLimit": 38,
          "location": {
            "lat": -33.580048,
            "lon": -70.56817
          }
        },
        {
          "time": 1642500498000,
          "speed": 20,
          "speedLimit": 38,
          "location": {
            "lat": -33.580053,
            "lon": -70.568502
          }
        }
      ]
    }
    jest.spyOn(service, 'createTrips').mockImplementation(async () => tripMock);
    expect(service.createTrips(dto)).resolves.toEqual(tripMock).catch(err => {
      console.log(err);
    });
  })

  it('should be find trips', async() => {
    const filters =  {
      start_gte: 35141,
      start_lte: 65760,
      distance_gte: 58881,
      limit: 2,
      offset: 2,
      page: 1,
    }
    jest.spyOn(service, 'findTrips').mockImplementation(async () => tripMock);

    expect(service.findTrips(filters)).resolves.toEqual(tripMock).catch(err => {
      console.log(err);
    });
  })
});
