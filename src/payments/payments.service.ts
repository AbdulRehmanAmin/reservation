import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request } from "express";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Client, Environment, ApiError, CreatePaymentRequest, ChargeResponse } from "square";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PaymentsService {
  private readonly squareClient: Client;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {


    this.squareClient = new Client({
      environment: Environment.Sandbox,
      accessToken: configService.get("SQUARE_UP_ACCESS_TOKEN")
    });
  }
    //
    //   const response = await client.checkoutApi.createPaymentLink({
    //     idempotencyKey: uuidv4(),
    //     quickPay: {
    //       name: 'Booking',
    //       priceMoney: {
    //         amount: BigInt(createPaymentDto.total_amount*100),
    //         currency: 'USD'
    //       },
    //       locationId: 'LWVZ6MGERM05F',
    //     },
    //     checkoutOptions: {
    //       redirectUrl: 'https://bookings.airportdroplimo.com',
    //       customFields:[{
    //         title:createPaymentDto.order_number
    //       }]
    //     },
    //     prePopulatedData:{
    //       buyerEmail:createPaymentDto.buyer_email,
    //       // buyerPhoneNumber: '+14155552671'
    //     },
    //   });
    // // const location = await client.locationsApi.retrieveLocation('LWVZ6MGERM05F')
    //   if(response){
    //     return{
    //       status:'Success',
    //       message:'Payment Link Created Successfully',
    //       // data:response.result.relatedResources.orders,
    //       data:response.result.paymentLink,
    //       // location
    //     }
    //   }
    //   else{
    //     return {
    //       message:'Something Went Wrong',
    //       status:'Failed',
    //       data:[]
    //     }
    //   }

  async processPayment(nonce: string, amount: number, id: string): Promise<ChargeResponse> {
    const requestBody: CreatePaymentRequest = {
      sourceId: nonce,
      amountMoney: {
        amount: BigInt(amount),
        currency: "USD"
      },
      idempotencyKey: `payment_${uuidv4()}`
    };
    try {
      const response = await this.squareClient.paymentsApi.createPayment(requestBody);
      console.log(response.result);
      if (response) {
        const object = await this.prismaService.reservations.update({
          where: {
            uuid: id
          },
          data: {
            isPaid: 1,
            payment_method: "square-up"
          }
        });
        if (!object) {
          throw new HttpException(
            {
              statusCode: HttpStatus.NOT_IMPLEMENTED,
              message: "Payment failed" || "Internal server error"
            },
            HttpStatus.NOT_IMPLEMENTED
          );
        }
      }
      return response.result;
    } catch (error) {
      throw new Error(`Failed to process payment: ${error.message[0]}`);
    }
  }

  // async create(createPaymentDto: CreatePaymentDto) {
  //   try {
  //     const accessToken=this.configService.get('SQUARE_UP_ACCESS_TOKEN')
  //     const client = new Client({
  //      accessToken,
  //       environment:Environment.Sandbox,
  //       userAgentDetail: "Booking" // Remove or replace this detail when building your own app
  //
  //     })
  //
  //     const response = await client.checkoutApi.createPaymentLink({
  //       idempotencyKey: uuidv4(),
  //       quickPay: {
  //         name: 'Booking',
  //         priceMoney: {
  //           amount: BigInt(createPaymentDto.total_amount),
  //           currency: 'USD'
  //         },
  //         locationId: 'LWVZ6MGERM05F',
  //       },
  //       checkoutOptions: {
  //         redirectUrl: 'https://bookings.airportdroplimo.com'
  //       },
  //       prePopulatedData:{
  //         buyerEmail:createPaymentDto.buyer_email,
  //         // buyerPhoneNumber: '+14155552671'
  //       },
  //     });
  //   // const location = await client.locationsApi.retrieveLocation('LWVZ6MGERM05F')
  //     if(response){
  //       return{
  //         status:'Success',
  //         message:'Payment Link Created Successfully',
  //         // data:response.result.relatedResources.orders,
  //         data:response.result.paymentLink,
  //         // location
  //       }
  //     }
  //     else{
  //       return {
  //         message:'Something Went Wrong',
  //         status:'Failed',
  //         data:[]
  //       }
  //     }
  //
  //   } catch (err) {
  //     if (err instanceof ApiError) {
  //       throw new HttpException(
  //         {
  //           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //           message: err.errors.map((e) => e.detail).join(', ') || 'Internal server error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     } else {
  //       throw new HttpException(
  //         {
  //           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //           message: err?.meta?.target || err?.meta?.cause || err?.message || err?.stack || 'Internal server error',
  //         },
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  // }
  async webhookEndPoint(req: Request) {

    // console.dir(req.body.data,{depth:100} );
    switch (req.body.data.type) {
      case "payment":
        console.dir(req.body.data, { depth: 100 });
    }
    return req.body;
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
