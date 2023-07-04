import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCarPriceDto } from './dto/create-car-price.dto';
import { UpdateCarPriceDto } from './dto/update-car-price.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CarPricesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCarPriceDto: CreateCarPriceDto) {
    try {
      const response = await this.prismaService.car_prices.create({
        data: {
          car_id: createCarPriceDto.car_id,
          car_price_type_id: createCarPriceDto.car_price_type_id,
          monday: createCarPriceDto.monday,
          tuesday: createCarPriceDto.tuesday,
          wednesday: createCarPriceDto.wednesday,
          thursday: createCarPriceDto.thursday,
          friday: createCarPriceDto.friday,
          saturday: createCarPriceDto.saturday,
          sunday: createCarPriceDto.sunday,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      });

      return {
        status: response ? 'success' : 'failed',
        message: response
          ? 'Record created successfully!'
          : 'No record created!',
        data: response,
      };
    } catch (err) {
      throw new HttpException(
        err?.meta.target || err?.cause || 'Internal server error',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const carPrices = await this.prismaService.car_prices.findMany({
        include: {
          cars: {
            select: {
              name: true,
            },
          },
          car_price_types: {
            select: {
              name: true,
            },
          },
        },
      });
      const res = carPrices.map((car) => {
        return {
          id: car.id,
          car_id: car.car_id,
          car_price_type_id: car.car_price_type_id,
          monday: car.monday,
          tuesday: car.tuesday,
          wednesday: car.wednesday,
          thursday: car.thursday,
          friday: car.friday,
          saturday: car.saturday,
          sunday: car.sunday,
          car_name: car.cars.name,
          car_price_type_name: car.car_price_types.name,
          created_at: car.created_at,
          updated_at: car.updated_at,
        };
      });
      return {
        status: 'success',
        message:
          res.length > 0 ? 'Records found successfully!' : 'No records found!',
        data: res.length > 0 ? res : [],
      };
    } catch (err) {
      throw new HttpException(
        err?.meta.target || err?.cause || 'Internal server error',
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const carPrice = await this.prismaService.car_prices.findMany({
        where: {
          car_id: id,
        },
      });
      const filteredHourlyArray = carPrice.filter(obj => obj.car_price_type_id===1);
      const filteredMilesArray = carPrice.filter(obj => obj.car_price_type_id===2);
      return {
        status: carPrice ? 'success' : 'failed',
        message: carPrice ? 'Records found successfully!' : 'No records found!',
        data: carPrice || {},
        filteredHourlyArray,
        filteredMilesArray
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCarPriceDto: UpdateCarPriceDto) {
    try {
      const carPrice = await this.prismaService.car_prices.update({
        where: {
          id: id,
        },
        data: {
          car_id: updateCarPriceDto.car_id,
          car_price_type_id: updateCarPriceDto.car_price_type_id,
          monday: updateCarPriceDto.monday,
          tuesday: updateCarPriceDto.tuesday,
          wednesday: updateCarPriceDto.wednesday,
          thursday: updateCarPriceDto.thursday,
          friday: updateCarPriceDto.friday,
          saturday: updateCarPriceDto.saturday,
          sunday: updateCarPriceDto.sunday,
          updated_at: new Date().toISOString(),
        },
      });

      return {
        status: carPrice ? 'success' : 'failed',
        message: carPrice
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: carPrice,
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.car_prices.delete({
        where: {
          id: id,
        },
      });
      return {
        status: 'success',
        message: 'Car price deleted successfully!',
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
