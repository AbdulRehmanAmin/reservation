import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports : [HttpModule],
  controllers: [ReservationsController],
  providers: [PrismaService, ReservationsService],
})
export class ReservationsModule {}
