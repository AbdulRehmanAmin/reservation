import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTaxDto } from './dto/create-tax-dto';
import { UpdateTaxDto } from './dto/update-tax-dto';

@Injectable()
export class TaxesService {
  constructor(private readonly prismaService: PrismaService) {}

  async readTaxes(query: any): Promise<any> {
    try {
      const page = query.page * 1 || 1;
      const limit = query.limit * 1 || 10;
      const toSkip = (page - 1) * limit;
      const getAllTaxes = await this.prismaService.gratuities.findMany({
        skip: toSkip,
        take: limit,
        include:{
          services: {
            select:{
              Name:true
            }
          }
        }
      });
      const allTaxes=getAllTaxes?.map((tax:any)=>{
        return{
          name:tax.name,
          id:tax.id,
          status:tax.status,
          price:tax.price,
          percentage:tax.percentage,
          services: tax.services?.Name
        }
      })
      return {
        status: allTaxes.length > 0 ? 'success' : 'failed',
        message:
          allTaxes.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allTaxes,
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
  async createTax(body: CreateTaxDto): Promise<any> {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
      const status = body.status ? true : false;
      const newTax = await this.prismaService.gratuities.create({
        data: { ...body, status, created_at, updated_at },
      });
      return {
        status: newTax ? 'success' : 'failed',
        message: newTax ? 'Record created successfully!' : 'No record created!',
        data: newTax,
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
  async deleteTax(id: any): Promise<any> {
    try {
      await this.prismaService.gratuities.delete({
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
  async updateTax(id: number, body: UpdateTaxDto): Promise<any> {
    try {
      const updated_at = new Date().toISOString();
      const updateTax = await this.prismaService.gratuities.update({
        where: {
          id,
        },
        data: { ...body, updated_at },
      });
      return {
        status: updateTax ? 'success' : 'failed',
        message: updateTax
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateTax,
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
  async getTaxesByServiceId(id: number) {
    try {
      const allTaxes = await this.prismaService.gratuities.findMany({
        where: {
          service_id: Number(id),
        },
      });
      return {
        status: allTaxes.length > 0 ? 'success' : 'failed',
        message:
          allTaxes.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: allTaxes,
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
