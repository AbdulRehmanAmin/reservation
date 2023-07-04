import { CreateLocExceptionDto } from './create-loc-exception.dto';
declare const UpdateLocExceptionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLocExceptionDto>>;
export declare class UpdateLocExceptionDto extends UpdateLocExceptionDto_base {
    pick_up_postal_code: number;
    drop_off_postal_code: number;
    price: number;
}
export {};
