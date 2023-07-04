import { CreateTaxDto } from './dto/create-tax-dto';
import { UpdateTaxDto } from './dto/update-tax-dto';
import { TaxesService } from './taxes.service';
export declare class TaxesController {
    private readonly appService;
    constructor(appService: TaxesService);
    getTaxes(query: any): Promise<any>;
    createTax(body: CreateTaxDto): Promise<any>;
    deleteTax(id: any): Promise<any>;
    updateTax(id: number, body: UpdateTaxDto): Promise<any>;
    getTaxesByServiceId(id: number): Promise<any>;
}
