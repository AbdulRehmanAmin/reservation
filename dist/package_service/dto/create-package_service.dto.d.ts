export declare class CreatePackageServiceDto {
    name: string;
    description: string;
    pickup_location: string;
    pickup_lat: number;
    pickup_lng: number;
    dropoff_location: string;
    dropoff_lat: number;
    dropoff_lng: number;
    price: number;
    passenger_capacity: number;
    luggage: number;
    created_at: Date;
    updated_at: Date;
    car_id: number;
}
