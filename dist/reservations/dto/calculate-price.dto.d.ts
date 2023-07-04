declare class LocationDto {
    lat: number;
    long: number;
    locality: number;
}
export declare class CalculatePriceDTO {
    service_id: number;
    car_id: number;
    pick_up: LocationDto;
    drop_off: LocationDto;
}
export {};
