import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarPricesService } from './car-prices.service';
import { CreateCarPriceDto } from './dto/create-car-price.dto';
import { UpdateCarPriceDto } from './dto/update-car-price.dto';

@Controller('car-prices')
export class CarPricesController {
  constructor(private readonly carPricesService: CarPricesService) {}

  @Post()
  create(@Body() createCarPriceDto: CreateCarPriceDto) {
    return this.carPricesService.create(createCarPriceDto);
  }

  @Get()
  findAll() {
    return this.carPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carPricesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarPriceDto: UpdateCarPriceDto,
  ) {
    return this.carPricesService.update(+id, updateCarPriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carPricesService.remove(+id);
  }
}
