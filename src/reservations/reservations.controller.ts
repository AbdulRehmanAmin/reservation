import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CalculatePriceDTO } from './dto/calculate-price.dto';
import { ServiceSelectDto } from './dto/service-select.dto';
import { CreateAdminReservationDto } from "./dto/create-admin-reservation.dto";

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('/')
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Post('/admin')
  adminReservation(@Body() createReservationDto: CreateAdminReservationDto) {
    return this.reservationsService.adminReservation(createReservationDto);
  }

  @Get('/')
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }

  @Post('/get-cars-by-service')
  getCarsByService(@Body() dto: ServiceSelectDto) {
    return this.reservationsService.getCarsByService(dto);
  }
}
