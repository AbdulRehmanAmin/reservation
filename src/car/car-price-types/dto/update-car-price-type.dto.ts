import { PartialType } from '@nestjs/mapped-types';
import { CreateCarPriceTypeDto } from './create-car-price-type.dto';

export class UpdateCarPriceTypeDto extends PartialType(CreateCarPriceTypeDto) {}
