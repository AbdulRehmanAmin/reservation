import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { CreateManufactureDto } from './dto/create-manufacture.dto';
import { UpdateManufactureDto } from './dto/update-manufacture.dto';

@Controller('manufacture')
export class ManufactureController {
  constructor(private readonly manufactureService: ManufactureService) {}

  @Post('/')
  create(@Body() createManufactureDto: CreateManufactureDto) {
    return this.manufactureService.create(createManufactureDto);
  }

  @Get('/')
  findAll() {
    return this.manufactureService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.manufactureService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateManufactureDto: UpdateManufactureDto,
  ) {
    return this.manufactureService.update(+id, updateManufactureDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.manufactureService.remove(+id);
  }
}
