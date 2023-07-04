import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriversService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createDriverDto: CreateDriverDto) {
    try {
      const newDriver = await this.prismaService.drivers.create({
        data: createDriverDto,
      });
      return {
        status: newDriver ? 'success' : 'failed',
        message: newDriver
          ? 'Record created successfully!'
          : 'No record created!',
        data: newDriver,
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
      const allDrivers = await this.prismaService.drivers.findMany();
      return {
        status: allDrivers.length > 0 ? 'success' : 'failed',
        message:
          allDrivers.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allDrivers,
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
      const driver = await this.prismaService.drivers.findUnique({
        where: { id },
      });
      return {
        status: driver ? 'success' : 'failed',
        message: driver ? 'Records found successfully!' : 'No records found!',
        data: driver || {},
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

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    try {
      const updatedDriver = await this.prismaService.drivers.update({
        where: { id },
        data: updateDriverDto,
      });
      return {
        status: updatedDriver ? 'success' : 'failed',
        message: updatedDriver
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updatedDriver,
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
      const deletedDriver = await this.prismaService.drivers.delete({
        where: { id },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
        data: deletedDriver,
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
