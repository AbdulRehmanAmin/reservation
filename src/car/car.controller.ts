import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, HttpException, HttpStatus, Query
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CarService } from './car.service';
import { CreateCarDto, carType } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateSlabDto } from './dto/create-slab.dto';
import { CreateLocExceptionDto } from './dto/create-loc-exception.dto';
import { UpdateSlabDto } from './dto/update-slab.dto ';
import { UpdateLocExceptionDto } from './dto/update-loc-exception.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  // Car Module Routes
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }
  @Get()
  findAll() {
    return this.carService.findAll();
  }

  // Get Car By Type For Tour and Package Services
  @Get('car-by-type')
  async getCarByType(@Query('type') type:carType){
    try{
      return await this.carService.getCarByType(type)
    }catch (err) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || err?.message || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }

  // Slab Module Routes
  @Post('slab/:car_id')
  getCarByDriver(@Param('car_id') car_id: string, @Body() dto: CreateSlabDto) {
    return this.carService.addSlab(+car_id, dto);
  }
  @Patch('slab/:id')
  updateSlab(@Param('id') id: string, @Body() dto: UpdateSlabDto) {
    return this.carService.updateSlab(+id, dto);
  }
  @Delete('slab/:id')
  deleteSlab(@Param('id') id: string) {
    return this.carService.deleteSlab(+id);
  }



  // Location Exception Module Routes
  // @Post('loc-exception/:car_id')
  // addLocException(
  //   @Param('car_id') car_id: string,
  //   @Body() dto: CreateLocExceptionDto,
  // ) {
  //   return this.carService.addLocationException(+car_id, dto);
  // }
  // @Patch('loc-exception/:id')
  // updateLocException(
  //   @Param('id') id: string,
  //   @Body() dto: UpdateLocExceptionDto,
  // ) {
  //   return this.carService.updateLocationException(+id, dto);
  // }
  // @Delete('loc-exception/:id')
  // deleteLocException(@Param('id') id: string) {
  //   return this.carService.deleteLocationException(+id);
  // }
}
