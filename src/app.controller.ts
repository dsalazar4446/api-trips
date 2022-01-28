import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Root')
export class AppController {
  
  constructor(private readonly appService: AppService) {}

  @Get('check-healt')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica si el api esta funconando correctamente' })
  checkHealt(): string {
    return this.appService.checkHealt()
  }

}
