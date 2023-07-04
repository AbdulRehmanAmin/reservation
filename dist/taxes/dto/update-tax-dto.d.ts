import { CreateTaxDto } from './create-tax-dto';
declare const UpdateTaxDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTaxDto>>;
export declare class UpdateTaxDto extends UpdateTaxDto_base {
    name: string;
    price: number;
    percentage: number;
    status: boolean;
    service_id: number;
}
export {};
