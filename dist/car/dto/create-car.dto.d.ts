import { CreateSlabDto } from './create-slab.dto';
import { CarPriceDto } from "../car-prices/dto/create-car-price.dto";
export declare enum carType {
    Other = "Other",
    Tour = "Tour",
    Package = "Package"
}
export declare class CreateCarDto {
    body_type_id: number;
    transmission_id: number;
    manufacturer_id: number;
    driver_id: number;
    fuel_id: number;
    vehicle_type_id: number;
    car_model: string;
    name: string;
    qty: string;
    passenger_seats: number;
    maximum_luggage: number;
    total_doors: number;
    child_seat: number;
    pic: string;
    image: string;
    status: boolean;
    per_mile_rate: number;
    hourly_rate: number;
    minimum_fare: number;
    minimum_hours: number;
    fixed_price: number;
    is_slab_enabled: boolean;
    is_loc_enabled: boolean;
    slabs: CreateSlabDto[];
    features: String[];
    is_car_details_enabled: boolean;
    car_hourly_details: CarPriceDto;
    car_per_mile_details: CarPriceDto;
    car_type: carType;
}
