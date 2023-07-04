import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { features } from 'process';
import { PrismaService } from 'src/prisma.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();

      const createFeature = await this.prismaService.features.create({
        data: { ...createFeatureDto, created_at, updated_at },
      });
      return {
        status: createFeature ? 'success' : 'failed',
        message: createFeature
          ? 'Record created successfully!'
          : 'No record created!',
        data: createFeature,
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
      const allFeatures = await this.prismaService.features.findMany();
      return {
        status: allFeatures.length > 0 ? 'success' : 'failed',
        message:
          allFeatures.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allFeatures,
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
      const singleFeature = await this.prismaService.features.findUnique({
        where: { id },
      });
      return {
        status: singleFeature ? 'success' : 'failed',
        message: singleFeature
          ? 'Record found successfully!'
          : 'No record found!',
        data: singleFeature || {},
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

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    try {
      const updated_at = new Date().toISOString();
      const updateFeature = await this.prismaService.features.update({
        where: { id },
        data: { ...updateFeatureDto, updated_at },
      });
      return {
        status: updateFeature ? 'success' : 'failed',
        message: updateFeature
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateFeature,
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
      await this.prismaService.features.delete({
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
