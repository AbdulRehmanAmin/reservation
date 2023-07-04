import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarPriceTypesService } from './car-price-types.service';
import { CreateCarPriceTypeDto } from './dto/create-car-price-type.dto';
import { UpdateCarPriceTypeDto } from './dto/update-car-price-type.dto';

@Controller('car-price-types')
export class CarPriceTypesController {
  constructor(private readonly carPriceTypesService: CarPriceTypesService) {}

  @Post()
  create(@Body() createCarPriceTypeDto: CreateCarPriceTypeDto) {
    return this.carPriceTypesService.create(createCarPriceTypeDto);
  }

  @Get()
  findAll() {
    return this.carPriceTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carPriceTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarPriceTypeDto: UpdateCarPriceTypeDto,
  ) {
    return this.carPriceTypesService.update(+id, updateCarPriceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carPriceTypesService.remove(+id);
  }
}
