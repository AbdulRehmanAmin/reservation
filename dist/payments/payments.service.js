"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const square_1 = require("square");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const prisma_service_1 = require("../prisma.service");
let PaymentsService = class PaymentsService {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.squareClient = new square_1.Client({
            environment: square_1.Environment.Sandbox,
            accessToken: configService.get("SQUARE_UP_ACCESS_TOKEN")
        });
    }
    async processPayment(nonce, amount, id) {
        const requestBody = {
            sourceId: nonce,
            amountMoney: {
                amount: BigInt(amount),
                currency: "USD"
            },
            idempotencyKey: `payment_${(0, uuid_1.v4)()}`
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
                    throw new common_1.HttpException({
                        statusCode: common_1.HttpStatus.NOT_IMPLEMENTED,
                        message: "Payment failed" || "Internal server error"
                    }, common_1.HttpStatus.NOT_IMPLEMENTED);
                }
            }
            return response.result;
        }
        catch (error) {
            throw new Error(`Failed to process payment: ${error.message[0]}`);
        }
    }
    async webhookEndPoint(req) {
        switch (req.body.data.type) {
            case "payment":
                console.dir(req.body.data, { depth: 100 });
        }
        return req.body;
    }
    findAll() {
        return `This action returns all payments`;
    }
    findOne(id) {
        return `This action returns a #${id} payment`;
    }
    update(id, updatePaymentDto) {
        return `This action updates a #${id} payment`;
    }
    remove(id) {
        return `This action removes a #${id} payment`;
    }
};
PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map