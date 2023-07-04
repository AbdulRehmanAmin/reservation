import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  HttpCode
} from "@nestjs/common";
import {Request} from 'express'
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('checkout')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('/square-up')
  @HttpCode(HttpStatus.OK)
  async processPayment(@Body() body: CreatePaymentDto) {
    try {
      console.log("APi Hit",body);
      const response = await this.paymentsService.processPayment(body.nonce, body.amount,body.id);
      if(!response){
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_IMPLEMENTED,
            message: "Payment failed" || "Internal server error"
          },
          HttpStatus.NOT_IMPLEMENTED
        );
      }
      return {
        statusCode:HttpStatus.OK,
        message:"Payment Success"
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: e.message || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

 // async create(@Body() createPaymentDto: CreatePaymentDto) {
 //    try{
 //      return this.paymentsService.create(createPaymentDto);
 //    }catch (err) {
 //      throw new HttpException(
 //        {
 //          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
 //          message:
 //            err?.meta?.target || err?.meta?.cause || "Internal server error"
 //        },
 //        HttpStatus.INTERNAL_SERVER_ERROR
 //      );
 //    }
 //  }

  @Post('/success')
  async webhookEndPoint(@Req() req:Request){
    return await this.paymentsService.webhookEndPoint(req);
  }
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
