import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';

@Injectable()
export class BodyTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBodyTypeDto: CreateBodyTypeDto) {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();

      const createBodyType = await this.prismaService.body_types.create({
        data: { ...createBodyTypeDto, created_at, updated_at },
      });
      return {
        status: createBodyType ? 'success' : 'failed',
        message: createBodyType
          ? 'Record created successfully!'
          : 'No record created!',
        data: createBodyType,
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
      const allBodyTypes = await this.prismaService.body_types.findMany();
      return {
        status: allBodyTypes.length > 0 ? 'success' : 'failed',
        message:
          allBodyTypes.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allBodyTypes,
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
      const singleBodyType = await this.prismaService.body_types.findUnique({
        where: { id },
      });
      return {
        status: singleBodyType ? 'success' : 'failed',
        message: singleBodyType
          ? 'Record found successfully!'
          : 'No record found!',
        data: singleBodyType || {},
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

  async update(id: number, updateBodyTypeDto: UpdateBodyTypeDto) {
    try {
      const updated_at = new Date().toISOString();
      const updateBodyType = await this.prismaService.body_types.update({
        where: { id },
        data: { ...updateBodyTypeDto, updated_at },
      });
      return {
        status: updateBodyType ? 'success' : 'failed',
        message: updateBodyType
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateBodyType,
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
      await this.prismaService.body_types.delete({
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
