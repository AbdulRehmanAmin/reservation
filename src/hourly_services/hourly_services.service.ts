import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHourlyServiceDto } from './dto/create-hourly_service.dto';
import { UpdateHourlyServiceDto } from './dto/update-hourly_service.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HourlyServicesService {
  constructor(private readonly prismaService: PrismaService) {}
  async createHourlyService(body: CreateHourlyServiceDto) {
    try {
      const newHourlyService = await this.prismaService.hourly_services.create({
        data: {
          name: body.name,
          description: body?.description,
          pickup_location: body.pickup_location,
          pickup_date_time: body.pickup_date_time,
          num_passengers: body.num_passengers,
          num_service_hours: body.num_service_hours,
          dropoff_location: body.dropoff_location,
          add_another_stop: body.add_another_stop,
          additional_comments: body?.additional_comments,
          status: body.status || true,
          service_id: body.service_id,
        },
      });

      return {
        status: newHourlyService ? 'success' : 'failed',
        message: newHourlyService
          ? 'Record created successfully!'
          : 'No record created!',
        data: newHourlyService,
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

  async findAllHourlyService() {
    try {
      const hourlyServices = await this.prismaService.hourly_services.findMany(
        {},
      );
      return {
        status: hourlyServices.length > 0 ? 'success' : 'failed',
        message:
          hourlyServices.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        count: hourlyServices.length,
        data: hourlyServices,
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

  async singleHourlyService(id: number) {
    try {
      const singleHourlyService =
        await this.prismaService.hourly_services.findUnique({
          where: {
            id: Number(id),
          },
        });
      return {
        status: singleHourlyService ? 'success' : 'failed',
        message: singleHourlyService
          ? 'Record found successfully!'
          : 'No record found!',
        data: singleHourlyService || {},
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

  async updateHourlyService(id: number, body: UpdateHourlyServiceDto) {
    try {
      const updated_at = new Date().toISOString();
      const updateHourlyService =
        await this.prismaService.hourly_services.update({
          where: {
            id: Number(id),
          },
          data: { ...body, updated_at },
        });

      return {
        status: updateHourlyService ? 'success' : 'failed',
        message: updateHourlyService
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateHourlyService,
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

  async deleteHourlyService(id: number) {
    try {
      const deleteHourlyService =
        await this.prismaService.hourly_services.delete({
          where: {
            id: Number(id),
          },
        });
      if (!deleteHourlyService) {
        throw new HttpException(
          { status: 'failed', message: 'Not deleted!' },
          HttpStatus.NOT_IMPLEMENTED,
        );
        // return { status: 'failed', message: 'Not deleted!' };
      }
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
