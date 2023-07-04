export declare class CreateHourlyServiceDto {
    name: string;
    description: string;
    pickup_location: string;
    pickup_date_time: Date;
    num_passengers: number;
    num_service_hours: number;
    dropoff_location: string;
    add_another_stop: boolean;
    additional_comments: string;
    status: boolean;
    service_id: number;
}
