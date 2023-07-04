import { Module } from '@nestjs/common';
import { TransmissionService } from './transmission.service';
import { TransmissionController } from './transmission.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TransmissionController],
  providers: [PrismaService, TransmissionService],
})
export class TransmissionModule {}
