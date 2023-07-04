import { Injectable } from '@nestjs/common';
import { CreateCarPriceTypeDto } from './dto/create-car-price-type.dto';
import { UpdateCarPriceTypeDto } from './dto/update-car-price-type.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class CarPriceTypesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createCarPriceTypeDto: CreateCarPriceTypeDto) {
    const response = await this.prismaService.car_price_types.create({
      data: {
        name: createCarPriceTypeDto.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });
    return {
      status: 'success',
      message: 'Car price type created successfully!',
      data: response,
    };
  }
  async findAll() {
    const carPriceTypes = await this.prismaService.car_price_types.findMany();
    return {
      status: 'success',
      message:
        carPriceTypes.length > 0
          ? 'Records found successfully!'
          : 'No records found!',
      data: carPriceTypes.length > 0 ? carPriceTypes : [],
    };
  }
  async findOne(id: number) {
    const carPriceType = await this.prismaService.car_price_types.findUnique({
      where: {
        id: id,
      },
    });
    return {
      status: 'success',
      message: 'Record found successfully!',
      data: carPriceType,
    };
  }
  async update(id: number, updateCarPriceTypeDto: UpdateCarPriceTypeDto) {
    const response = await this.prismaService.car_price_types.update({
      where: {
        id: id,
      },
      data: {
        name: updateCarPriceTypeDto.name,
        updated_at: new Date().toISOString(),
      },
    });
    return {
      status: 'success',
      message: 'Car price type updated successfully!',
      data: response,
    };
  }
  async remove(id: number) {
    const response = await this.prismaService.car_price_types.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 'success',
      message: 'Car price type deleted successfully!',
      data: response,
    };
  }
}
