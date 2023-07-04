import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { subServicesService } from './sub_services.service';
import { CreateSubServiceDto } from './dto/create-sub_service.dto';
import { UpdateSubServiceDto } from './dto/update-sub_service.dto';

@Controller('sub-services')
export class ToursServicesController {
  constructor(private readonly subServicesService: subServicesService) {}

  @Post('/create')
  create(@Body() body: CreateSubServiceDto) {
    try {
      return this.subServicesService.createSubService(body);
    } catch (err) {
      throw new BadRequestException('Internal Server Error');
    }
  }
  // ****---**** Previous Function when all services have separate module ****---****
  // @Get('/get-all-tours-services')
  // findAll(@Query('page') page: string = "1", @Query('limit') limit: string = "5", @Query('searchQuery') searchQuery: string) {
  //   return this.toursServicesService.findAll({limit: Number(limit), page: Number(page), searchQuery: searchQuery});
  // }

  @Get('/get-all-sub_services')
  findAll() {
    return this.subServicesService.findAll();
  }

  @Get('/get-sub_service/:id')
  findOne(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('searchQuery') searchQuery: string,
  ) {
    return this.subServicesService.findOne(+id, {
      limit: Number(limit),
      page: Number(page),
      searchQuery: searchQuery,
    });
  }

  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSubServiceDto: UpdateSubServiceDto,
  ) {
    return this.subServicesService.update(+id, updateSubServiceDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.subServicesService.remove(+id);
  }

  // ****---**** Previous Function when all services have separate module ****---****
  @Get('get-time-slots/:id')
  getTimeSlots(@Param('id')id:string){
   return this.subServicesService.getTimeslots(+id);
  }
}
