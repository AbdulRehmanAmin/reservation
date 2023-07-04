import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';

@Injectable()
export class VehicleTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVehicleTypeDto: CreateVehicleTypeDto) {
    try {
      const newVehicle = await this.prismaService.vehicle_types.create({
        data: createVehicleTypeDto,
      });
      return {
        status: newVehicle ? 'success' : 'failed',
        message: newVehicle
          ? 'Record created successfully!'
          : 'No record created!',
        data: newVehicle,
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
      const allVehicleTypes = await this.prismaService.vehicle_types.findMany();
      return {
        status: allVehicleTypes.length > 0 ? 'success' : 'failed',
        message:
          allVehicleTypes.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allVehicleTypes,
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
      const vehicle = await this.prismaService.vehicle_types.findUnique({
        where: { id },
      });
      return {
        status: vehicle ? 'success' : 'failed',
        message: vehicle ? 'Records found successfully!' : 'No records found!',
        data: vehicle || {},
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

  async update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    try {
      const updatedVehicleType = await this.prismaService.vehicle_types.update({
        where: { id },
        data: updateVehicleTypeDto,
      });
      return {
        status: updatedVehicleType ? 'success' : 'failed',
        message: updatedVehicleType
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updatedVehicleType,
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
      const deletedVehicleType = await this.prismaService.vehicle_types.delete({
        where: { id },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
        data: deletedVehicleType,
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
