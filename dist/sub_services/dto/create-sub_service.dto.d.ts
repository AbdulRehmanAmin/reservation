export declare class CreateSubServiceDto {
    service_id: number;
    time: string[];
    name: string;
    pickup_location: string;
    pickup_lat: number;
    pickup_lng: number;
    dropoff_location: string;
    dropoff_lat: number;
    dropoff_lng: number;
    price_per_passenger: number;
    luggage: number;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
    passenger_capacity: number;
    description: string;
    car_id: number;
    time_slots: [TimeSlots];
}
export declare class TimeSlots {
    id: number;
    time: string;
    sub_service_id: number;
    created_at: Date;
    updated_at: Date;
}
