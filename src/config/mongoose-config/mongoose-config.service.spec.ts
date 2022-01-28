import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from './mongoose-config.service';

describe('MongooseConfigService', () => {
  let service: MongooseConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MongooseConfigService],
    }).compile();

    service = module.get<MongooseConfigService>(MongooseConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be createMongooseOptions', () => {
    const result = service.createMongooseOptions()
    expect(result).toBeDefined();
  });
});
