import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteServiceDto } from './create-route-service.dto';

export class UpdateRouteServiceDto extends PartialType(CreateRouteServiceDto) {}
