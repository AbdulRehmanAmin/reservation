import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HourlyServicesService } from './hourly_services.service';
import { CreateHourlyServiceDto } from './dto/create-hourly_service.dto';
import { UpdateHourlyServiceDto } from './dto/update-hourly_service.dto';

@Controller('hourly_services')
export class HourlyServicesController {
  constructor(private readonly hourlyServicesService: HourlyServicesService) {}

  @Post('/')
  async createHourlyService(
    @Body() body: CreateHourlyServiceDto,
  ): Promise<any> {
    return await this.hourlyServicesService.createHourlyService(body);
  }

  @Get('/hourlyServices')
  findAll() {
    return this.hourlyServicesService.findAllHourlyService();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<any> {
    return await this.hourlyServicesService.singleHourlyService(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateHourlyServiceDto: UpdateHourlyServiceDto,
  ) {
    return await this.hourlyServicesService.updateHourlyService(
      id,
      updateHourlyServiceDto,
    );
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.hourlyServicesService.deleteHourlyService(id);
  }
}
