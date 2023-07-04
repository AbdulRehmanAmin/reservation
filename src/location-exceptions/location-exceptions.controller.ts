import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { LocationExceptionsService } from './location-exceptions.service';
import { CreateLocationExceptionDto } from './dto/create-location-exception.dto';
import { UpdateLocationExceptionDto } from './dto/update-location-exception.dto';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('location-exceptions')
export class LocationExceptionsController {
  constructor(private readonly locationExceptionsService: LocationExceptionsService) {}

  @Post()
  create(@Body() createLocationExceptionDto: CreateLocationExceptionDto) {
    return this.locationExceptionsService.create(createLocationExceptionDto);
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file:Express.Multer.File) {
    try{
      const result = await this.locationExceptionsService.processCsv(file.path);
      return{
        status: 'successfully Created',
      }
    }catch (error) {
      return {
        status: 'fail',
        message: error.message,
        data: error.data,
      };
    }
  }

  @Get()
  findAll() {
    return this.locationExceptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationExceptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationExceptionDto: UpdateLocationExceptionDto) {
    return this.locationExceptionsService.update(+id, updateLocationExceptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationExceptionsService.remove(+id);
  }
}
