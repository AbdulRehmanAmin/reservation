import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AirportDTO } from './dto/create-airport_service.dto';
import { UpdateAirportServiceDto } from './dto/update-airport_service.dto';
import { PrismaService } from "../prisma.service";
import { ConfigService } from "@nestjs/config";
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AirportServicesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    // private readonly jwtService: JwtService,
  ) {}
  async create(body: AirportDTO): Promise<any> {
    try {
      if (!body.service_id) {
        throw new HttpException(
          {
            status: 'failed',
            message: '(service_id) must required!',
          },
          HttpStatus.NOT_IMPLEMENTED,
        );
      }
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
      // const status = body.status.toLowerCase() === 'active' ? 1 : 0;
      const newAirport = await this.prismaService.airport_services.create({
        data: {
        name:body.name,
          description:body.description,
        pickup_dropoff:body.pickup_dropoff,
          pickup_date_time:body.pickup_date_time,
          num_passengers:body.num_passengers,
        pickup_from:body.pickup_from,
          dropoff_location:body.dropoff_location,
          airline:body.airline,
          flight_number:body.flight_number,
          status:body.status,
          service_id:body.service_id,
          pick_up_lat:body.pick_up_lat,
          pick_up_lon:body.pick_up_lon,
          drop_off_lat:body.drop_off_lat,
          drop_off_lon:body.drop_off_lon
        }
      });
      return {
        status: newAirport ? 'success' : 'failed',
        message: newAirport ? 'Record created successfully!' : 'No record created!',
        data: newAirport,
      };
    } catch (err) {
      console.log("----------->",err);
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
      const ApServices = await this.prismaService.airport_services.findMany();

      return {
        status: ApServices.length > 0 ? 'success' : 'failed',
        message:
          ApServices.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: ApServices,
      };
    } catch (err) {
      console.log("---------> ",err);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    };
  }

  async findOne(id: number):Promise<any> {
    try {
      const ApServices = await this.prismaService.airport_services.findUnique({
        where: {
          id: Number(id),
        },
      });

      return {
        status: ApServices ? 'success' : 'failed',
        message:
          ApServices
            ? 'Records found successfully!'
            : 'No records found!',
        data: ApServices,
      };
    } catch (err) {
      console.log("---------> ",err);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    };
  }

  async update(id: number, body: UpdateAirportServiceDto):Promise<any> {
    try {
      // let status;
      // if (body.status) {
      //   status = body.status.toLowerCase() === 'active' ? 1 : 0;
      // }
      // const updated_at = new Date().toISOString();
      const updateApService = await this.prismaService.airport_services.update({
        where: {
          id,
        },
        data: { ...body },
      });
      return {
        status: updateApService ? 'success' : 'failed',
        message: updateApService
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateApService,
      };
    } catch (err) {
      console.log("------> Erorr",err);
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
  async remove(id: number):Promise<any> {
    try {
      await this.prismaService.airport_services.delete({
        where: {
          id: Number(id),
        },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
      };
    } catch(err) {
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




