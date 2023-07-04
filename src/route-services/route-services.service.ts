import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRouteServiceDto } from './dto/create-route-service.dto';
import { UpdateRouteServiceDto } from './dto/update-route-service.dto';

@Injectable()
export class RouteServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createRouteServiceDto: CreateRouteServiceDto) {
    return 'This action adds a new routeService';
  }

  async findAll() {
    try {
      const allServices = await this.prismaService.services.findMany();

      return {
        status: allServices.length > 0 ? 'success' : 'failed',
        message:
          allServices.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allServices,
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
      const singleSrvc = await this.prismaService.services.findUnique({
        where: { id },
      });
      return {
        status: singleSrvc ? 'success' : 'failed',
        message: singleSrvc
          ? 'Records found successfully!'
          : 'No records found!',
        data: singleSrvc || {},
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

  update(id: number, updateRouteServiceDto: UpdateRouteServiceDto) {
    return `This action updates a #${id} routeService`;
  }

  remove(id: number) {
    return `This action removes a #${id} routeService`;
  }
}
