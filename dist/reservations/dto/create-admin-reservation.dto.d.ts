export declare class CreateAdminReservationDto {
    service_id: number;
    order_number: string;
    pick_up_loc_name: string;
    drop_off_loc_name: string;
    pick_up_date: Date;
    flight_no: string;
    airline: string;
    maximum_passenger: number;
    maximum_luggage: number;
    car_id: number;
    tax: number;
    price: number;
    coupon: string;
    payment_status: string;
    special_instruction: string;
}
