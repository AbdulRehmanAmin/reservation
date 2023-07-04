import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTransmissionDto } from './dto/create-transmission.dto';
import { UpdateTransmissionDto } from './dto/update-transmission.dto';

@Injectable()
export class TransmissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTransmissionDto: CreateTransmissionDto) {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
      const createTransmission = await this.prismaService.transmissions.create({
        data: { ...createTransmissionDto, created_at, updated_at },
      });
      return {
        status: createTransmission ? 'success' : 'failed',
        message: createTransmission
          ? 'Record created successfully!'
          : 'No record created!',
        data: createTransmission,
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
      const transmissions = await this.prismaService.transmissions.findMany();
      return {
        status: transmissions.length > 0 ? 'success' : 'failed',
        message:
          transmissions.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: transmissions,
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
      const transmission = await this.prismaService.transmissions.findUnique({
        where: { id },
      });
      return {
        status: transmission ? 'success' : 'failed',
        message: transmission
          ? 'Record found successfully!'
          : 'No record found!',
        data: transmission || {},
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

  async update(id: number, updateTransmissionDto: UpdateTransmissionDto) {
    try {
      const updated_at = new Date().toISOString();
      const updateTransmission = await this.prismaService.transmissions.update({
        where: { id },
        data: { ...updateTransmissionDto, updated_at },
      });
      return {
        status: updateTransmission ? 'success' : 'failed',
        message: updateTransmission
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateTransmission,
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
      await this.prismaService.transmissions.delete({
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
