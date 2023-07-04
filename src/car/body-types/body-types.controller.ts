import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BodyTypesService } from './body-types.service';
import { CreateBodyTypeDto } from './dto/create-body-type.dto';
import { UpdateBodyTypeDto } from './dto/update-body-type.dto';

@Controller('body-types')
export class BodyTypesController {
  constructor(private readonly bodyTypesService: BodyTypesService) {}

  @Post('/')
  create(@Body() createBodyTypeDto: CreateBodyTypeDto) {
    return this.bodyTypesService.create(createBodyTypeDto);
  }

  @Get('/')
  findAll() {
    return this.bodyTypesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.bodyTypesService.findOne(+id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateBodyTypeDto: UpdateBodyTypeDto,
  ) {
    return this.bodyTypesService.update(+id, updateBodyTypeDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.bodyTypesService.remove(+id);
  }
}
