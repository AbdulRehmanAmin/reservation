import { CreateLocationExceptionDto } from './create-location-exception.dto';
declare const UpdateLocationExceptionDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateLocationExceptionDto>>;
export declare class UpdateLocationExceptionDto extends UpdateLocationExceptionDto_base {
    pick_up_postal_code: string;
    drop_off_postal_code: string;
    price: number;
    drop_off_loc_name: string;
    pick_up_loc_name: string;
}
export {};
