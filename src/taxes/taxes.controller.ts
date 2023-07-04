import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaxDto } from './dto/create-tax-dto';
import { UpdateTaxDto } from './dto/update-tax-dto';
import { TaxesService } from './taxes.service';

@Controller('taxes')
export class TaxesController {
  constructor(private readonly appService: TaxesService) {}

  //   read all taxes
  @Get('/')
  async getTaxes(@Query() query: any): Promise<any> {
    return this.appService.readTaxes(query);
  }

  //   create new tax
  @Post('/')
  async createTax(@Body() body: CreateTaxDto): Promise<any> {
    return this.appService.createTax(body);
  }

  //   delete a Tax
  @Delete('/:id')
  async deleteTax(@Param('id') id: any): Promise<any> {
    return this.appService.deleteTax(id);
  }

  //   update the Tax
  @Patch('/:id')
  async updateTax(
    @Param('id') id: number,
    @Body() body: UpdateTaxDto,
  ): Promise<any> {
    return this.appService.updateTax(+id, body);
  }

  // get all Taxes by service id
  @Get('/:service_id')
  async getTaxesByServiceId(@Param('service_id') id: number): Promise<any> {
    return this.appService.getTaxesByServiceId(+id);
  }
}
