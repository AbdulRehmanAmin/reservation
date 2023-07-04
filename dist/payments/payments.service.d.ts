import { Request } from "express";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ChargeResponse } from "square";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma.service";
export declare class PaymentsService {
    private readonly prismaService;
    private readonly configService;
    private readonly squareClient;
    constructor(prismaService: PrismaService, configService: ConfigService);
    processPayment(nonce: string, amount: number, id: string): Promise<ChargeResponse>;
    webhookEndPoint(req: Request): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: number): string;
}
