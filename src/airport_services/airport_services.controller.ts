import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AirportServicesService } from './airport_services.service';
import { AirportDTO } from './dto/create-airport_service.dto';
import { UpdateAirportServiceDto } from './dto/update-airport_service.dto';

@Controller('airport-services')
export class AirportServicesController {
  constructor(
    private readonly airportServicesService: AirportServicesService,
  ) {}

  @Post('/create')
  async create(@Body() body: AirportDTO): Promise<any> {
    return await this.airportServicesService.create(body);
  }

  @Get('/getAirports')
  async findAll() {
    return await this.airportServicesService.findAll();
  }

  @Get('/getAirports/:id')
  findOne(@Param('id') id: string) {
    return this.airportServicesService.findOne(+id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() body: UpdateAirportServiceDto) {
    return this.airportServicesService.update(+id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.airportServicesService.remove(+id);
  }
}
