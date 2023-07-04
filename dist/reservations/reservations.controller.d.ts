/// <reference types="node" />
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ServiceSelectDto } from './dto/service-select.dto';
import { CreateAdminReservationDto } from "./dto/create-admin-reservation.dto";
export declare class ReservationsController {
    private readonly reservationsService;
    constructor(reservationsService: ReservationsService);
    create(createReservationDto: CreateReservationDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").reservations;
    }>;
    adminReservation(createReservationDto: CreateAdminReservationDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").reservations;
    }>;
    findAll(): Promise<{
        status: string;
        message: string;
        data: {
            id: number;
            service_id: number;
            car_id: number;
            pick_up_loc_name: string;
            pick_up_postal_code: string;
            pick_up_lat: number;
            pick_up_lon: number;
            drop_off_loc_name: string;
            drop_off_postal_code: string;
            drop_off_lat: number;
            drop_off_lon: number;
            airline: string;
            flight_no: string;
            pick_up_date: Date;
            no_of_hours: number;
            price: number;
            tax: number;
            customer_first_name: string;
            customer_last_name: string;
            customer_phone: string;
            customer_cnic: string;
            customer_email: string;
            maximum_passenger: number;
            maximum_luggage: number;
            service_name: string;
            car_name: string;
            created_at: Date;
            updated_at: Date;
            isPaid: number;
            specialInstruction: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        status: string;
        message: string;
        data: {};
    }>;
    update(id: string, updateReservationDto: UpdateReservationDto): Promise<{
        status: string;
        message: string;
        data: import(".prisma/client").reservations;
    }>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }>;
    getCarsByService(dto: ServiceSelectDto): Promise<{
        status: string;
        message: string;
        data: any;
        error: boolean;
        tax?: undefined;
        price?: undefined;
        base_price?: undefined;
        service_name?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            time: any;
            id: number;
            name: string;
            pickup_location: string;
            pickup_lat: number;
            pickup_lng: number;
            dropoff_location: string;
            dropoff_lat: number;
            dropoff_lng: number;
            price_per_passenger: number;
            status: Buffer;
            created_at: Date;
            updated_at: Date;
            isActive: boolean;
            car_id: number;
            service_id: number;
            description: string;
            luggage: number;
            passenger_capacity: number;
            cars: import(".prisma/client").cars;
        };
        tax: number;
        price: any;
        base_price: any;
        service_name: {
            name: string;
            price: number;
            percentage: number;
        }[];
        error?: undefined;
    } | {
        status: string;
        message: string;
        data: import(".prisma/client").sub_services & {
            cars: import(".prisma/client").cars;
        };
        tax: number;
        price: number;
        base_price: number;
        service_name: {
            name: string;
            price: number;
            percentage: number;
        }[];
        error?: undefined;
    } | {
        status: string;
        message: string;
        data: {
            base_price: any;
            id: number;
            name: string;
            pickup_location: string;
            pickup_lat: number;
            pickup_lng: number;
            dropoff_location: string;
            dropoff_lat: number;
            dropoff_lng: number;
            price_per_passenger: number;
            status: Buffer;
            created_at: Date;
            updated_at: Date;
            isActive: boolean;
            car_id: number;
            service_id: number;
            description: string;
            luggage: number;
            passenger_capacity: number;
            cars: import(".prisma/client").cars;
            tax: number;
            price: any;
        };
        service_name: {
            name: string;
            price: number;
            percentage: number;
        }[];
        error?: undefined;
        tax?: undefined;
        price?: undefined;
        base_price?: undefined;
    } | {
        status: string;
        message: string;
        data: import(".prisma/client").sub_services & {
            cars: import(".prisma/client").cars;
        };
        tax: number;
        price: number;
        service_name: {
            name: string;
            price: number;
            percentage: number;
        }[];
        error?: undefined;
        base_price?: undefined;
    } | {
        status: string;
        message: string;
        data: any[];
        error?: undefined;
        tax?: undefined;
        price?: undefined;
        base_price?: undefined;
        service_name?: undefined;
    }>;
}
