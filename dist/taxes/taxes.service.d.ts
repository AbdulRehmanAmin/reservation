import { PrismaService } from 'src/prisma.service';
import { CreateTaxDto } from './dto/create-tax-dto';
import { UpdateTaxDto } from './dto/update-tax-dto';
export declare class TaxesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    readTaxes(query: any): Promise<any>;
    createTax(body: CreateTaxDto): Promise<any>;
    deleteTax(id: any): Promise<any>;
    updateTax(id: number, body: UpdateTaxDto): Promise<any>;
    getTaxesByServiceId(id: number): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").gratuities[];
    }>;
}
