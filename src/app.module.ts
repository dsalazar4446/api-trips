import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigService } from './config/mongoose-config/mongoose-config.service';
import { TripsModule } from './trips/trips.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache:true
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TripsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
