import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFuelTypeDto } from './dto/create-fuel-type.dto';
import { UpdateFuelTypeDto } from './dto/update-fuel-type.dto';

@Injectable()
export class FuelTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFuelTypeDto: CreateFuelTypeDto) {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();

      const createFuelType = await this.prismaService.fuel_types.create({
        data: { ...createFuelTypeDto, created_at, updated_at },
      });
      return {
        status: createFuelType ? 'success' : 'failed',
        message: createFuelType
          ? 'Record created successfully!'
          : 'No record created!',
        data: createFuelType,
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

  async findAll() {
    try {
      const allFuelTypes = await this.prismaService.fuel_types.findMany();
      return {
        status: allFuelTypes.length > 0 ? 'success' : 'failed',
        message:
          allFuelTypes.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allFuelTypes,
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

  async findOne(id: number) {
    try {
      const singleFuelType = await this.prismaService.fuel_types.findUnique({
        where: { id },
      });
      return {
        status: singleFuelType ? 'success' : 'failed',
        message: singleFuelType
          ? 'Record found successfully!'
          : 'No record found!',
        data: singleFuelType || {},
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

  async update(id: number, updateFuelTypeDto: UpdateFuelTypeDto) {
    try {
      const updated_at = new Date().toISOString();
      const updateFuelType = await this.prismaService.fuel_types.update({
        where: { id },
        data: { ...updateFuelTypeDto, updated_at },
      });
      return {
        status: updateFuelType ? 'success' : 'failed',
        message: updateFuelType
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateFuelType,
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
      await this.prismaService.fuel_types.delete({
        where: { id },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
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
