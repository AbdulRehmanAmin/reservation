import { AirportServicesService } from './airport_services.service';
import { AirportDTO } from './dto/create-airport_service.dto';
import { UpdateAirportServiceDto } from './dto/update-airport_service.dto';
export declare class AirportServicesController {
    private readonly airportServicesService;
    constructor(airportServicesService: AirportServicesService);
    create(body: AirportDTO): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, body: UpdateAirportServiceDto): Promise<any>;
    remove(id: string): Promise<any>;
}
