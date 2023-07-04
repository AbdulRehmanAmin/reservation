import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePointToPointDto } from './dto/create-point-to-point.dto';
import { UpdatePointToPointDto } from './dto/update-point-to-point.dto';

@Injectable()
export class PointToPointService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CreatePointToPointDto) {
    try {
      const newPtpSrvc =
        await this.prismaService.point_to_point_services.create({
          data: {
            service_id: body.service_id,
            name: body.name,
            description: body?.description,
            pickup_location: body.pickup_location,
            pickup_date_time: body.pickup_date_time,
            num_passengers: body.num_passengers,
            dropoff_location: body.dropoff_location,
            add_another_stop: body.add_another_stop ? true : false,
            additional_comments: body.additional_comments,
            status: body.status ? true : false,
            pick_up_lat: body.pick_up_lat,
            pick_up_lon: body.pick_up_lon,
            drop_off_lat: body.drop_off_lat,
            drop_off_lon: body.drop_off_lon,
          },
        });
      return {
        status: newPtpSrvc ? 'success' : 'failed',
        message: newPtpSrvc
          ? 'Record created successfully!'
          : 'No record created!',
        data: newPtpSrvc,
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
      const ptpSrvc =
        await this.prismaService.point_to_point_services.findMany();

      return {
        status: ptpSrvc.length > 0 ? 'success' : 'failed',
        message:
          ptpSrvc.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: ptpSrvc,
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
      const singlePtpSrvc =
        await this.prismaService.point_to_point_services.findUnique({
          where: { id },
        });
      return {
        status: singlePtpSrvc ? 'success' : 'failed',
        message: singlePtpSrvc
          ? 'Records found successfully!'
          : 'No records found!',
        data: singlePtpSrvc || {},
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

  async update(id: number, body: UpdatePointToPointDto) {
    try {
      const singleSrvc =
        await this.prismaService.point_to_point_services.findUnique({
          where: {
            id,
          },
        });
      const updateSrvc =
        await this.prismaService.point_to_point_services.update({
          where: { id },
          data: {
            service_id: body.service_id || singleSrvc.service_id,
            name: body.name || singleSrvc.name,
            description: body?.description || singleSrvc.description,
            pickup_location: body.pickup_location || singleSrvc.pickup_location,
            pickup_date_time:
              body.pickup_date_time || singleSrvc.pickup_date_time,
            num_passengers: body.num_passengers || singleSrvc.num_passengers,
            dropoff_location:
              body.dropoff_location || singleSrvc.dropoff_location,
            add_another_stop: body.add_another_stop
              ? true
              : false || singleSrvc.add_another_stop,
            additional_comments:
              body.additional_comments || singleSrvc.additional_comments,
            status: body.status ? true : false || singleSrvc.status,
            pick_up_lat: body.pick_up_lat || singleSrvc.pick_up_lat,
            pick_up_lon: body.pick_up_lon || singleSrvc.pick_up_lon,
            drop_off_lat: body.drop_off_lat || singleSrvc.drop_off_lat,
            drop_off_lon: body.drop_off_lon || singleSrvc.drop_off_lon,
          },
        });
      return {
        status: updateSrvc ? 'success' : 'failed',
        message: updateSrvc
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateSrvc,
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
      await this.prismaService.point_to_point_services.delete({
        where: {
          id: Number(id),
        },
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
