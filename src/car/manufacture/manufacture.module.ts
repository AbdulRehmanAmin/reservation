import { Module } from '@nestjs/common';
import { ManufactureService } from './manufacture.service';
import { ManufactureController } from './manufacture.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ManufactureController],
  providers: [PrismaService, ManufactureService],
})
export class ManufactureModule {}
