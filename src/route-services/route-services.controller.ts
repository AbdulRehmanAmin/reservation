import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RouteServicesService } from './route-services.service';
import { CreateRouteServiceDto } from './dto/create-route-service.dto';
import { UpdateRouteServiceDto } from './dto/update-route-service.dto';

@Controller('route-services')
export class RouteServicesController {
  constructor(private readonly routeServicesService: RouteServicesService) {}

  @Post('/')
  create(@Body() createRouteServiceDto: CreateRouteServiceDto) {
    return this.routeServicesService.create(createRouteServiceDto);
  }

  @Get('/')
  findAll() {
    return this.routeServicesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.routeServicesService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateRouteServiceDto: UpdateRouteServiceDto,
  ) {
    return this.routeServicesService.update(+id, updateRouteServiceDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.routeServicesService.remove(+id);
  }
}
