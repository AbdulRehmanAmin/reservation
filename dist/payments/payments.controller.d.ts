import { HttpStatus } from "@nestjs/common";
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    processPayment(body: CreatePaymentDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    webhookEndPoint(req: Request): Promise<any>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: string): string;
}
