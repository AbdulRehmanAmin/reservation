import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';

@Injectable()
export class ManufactureService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createManufactureDto: CreateManufactureDto): Promise<any> {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();

      const newManufacture = await this.prismaService.manufacturers.create({
        data: { ...createManufactureDto, created_at, updated_at },
      });

      return {
        status: newManufacture ? 'success' : 'failed',
        message: newManufacture
          ? 'Record created successfully!'
          : 'No record created!',
        data: newManufacture || {},
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

  async findAll(): Promise<any> {
    try {
      const allManufactures = await this.prismaService.manufacturers.findMany();
      return {
        status: allManufactures.length > 0 ? 'success' : 'failed',
        message:
          allManufactures.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allManufactures,
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

  async findOne(id: number): Promise<any> {
    try {
      const singleManufacture =
        await this.prismaService.manufacturers.findUnique({
          where: {
            id,
          },
        });
      return {
        status: singleManufacture ? 'success' : 'failed',
        message: singleManufacture
          ? 'Record found successfully!'
          : 'No record found!',
        data: singleManufacture || {},
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

  async update(id: number, updateManufactureDto: UpdateManufactureDto) {
    try {
      const updated_at = new Date().toISOString();
      const updated = await this.prismaService.manufacturers.update({
        where: {
          id,
        },
        data: { ...updateManufactureDto, updated_at },
      });
      return {
        status: updated ? 'success' : 'failed',
        message: updated
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updated || {},
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
      await this.prismaService.manufacturers.delete({
        where: {
          id,
        },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
      };
    } catch (err) {
      console.log(err);

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
