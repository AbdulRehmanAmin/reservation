import { CreateReservationDto } from './create-reservation.dto';
declare const UpdateReservationDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReservationDto>>;
export declare class UpdateReservationDto extends UpdateReservationDto_base {
    pick_up_loc_name: string;
    pick_up_postal_code: string;
    pick_up_lat: number;
    pick_up_lon: number;
    drop_off_loc_name: string;
}
export {};
