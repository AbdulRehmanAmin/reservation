import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PointToPointService } from './point-to-point.service';
import { CreatePointToPointDto } from './dto/create-point-to-point.dto';
import { UpdatePointToPointDto } from './dto/update-point-to-point.dto';

@Controller('point-to-point')
export class PointToPointController {
  constructor(private readonly pointToPointService: PointToPointService) {}

  @Post('/')
  create(@Body() createPointToPointDto: CreatePointToPointDto) {
    return this.pointToPointService.create(createPointToPointDto);
  }

  @Get('/')
  findAll() {
    return this.pointToPointService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.pointToPointService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updatePointToPointDto: UpdatePointToPointDto,
  ) {
    return this.pointToPointService.update(+id, updatePointToPointDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.pointToPointService.remove(+id);
  }
}
