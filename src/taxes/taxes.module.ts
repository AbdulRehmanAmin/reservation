import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaxesController } from './taxes.controller';
import { TaxesService } from './taxes.service';

@Module({
  controllers: [TaxesController],
  providers: [PrismaService, TaxesService],
})
export class TaxesModule {}
