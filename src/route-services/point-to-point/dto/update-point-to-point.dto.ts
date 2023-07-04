import { PartialType } from '@nestjs/mapped-types';
import { CreatePointToPointDto } from './create-point-to-point.dto';

export class UpdatePointToPointDto extends PartialType(CreatePointToPointDto) {}
