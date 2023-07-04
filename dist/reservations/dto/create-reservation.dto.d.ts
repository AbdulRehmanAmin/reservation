export declare class CreateReservationDto {
    sub_service_id: number;
    car_id: number;
    pick_up_loc_name: string;
    pick_up_postal_code: string;
    pick_up_lat: number;
    pick_up_long: number;
    drop_off_loc_name: string;
    drop_off_postal_code: string;
    drop_off_lat: number;
    drop_off_long: number;
    pick_up_date: Date;
    airline: string;
    flight_no: string;
    no_of_hours: number;
    customer_first_name: string;
    customer_last_name: string;
    customer_cnic: string;
    customer_email: string;
    customer_phone: string;
    maximum_passenger: number;
    maximum_luggage: number;
    price: number;
    tax: number;
    special_request: string;
}
