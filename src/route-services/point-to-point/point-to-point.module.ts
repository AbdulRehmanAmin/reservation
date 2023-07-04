import { Module } from '@nestjs/common';
import { PointToPointService } from './point-to-point.service';
import { PointToPointController } from './point-to-point.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PointToPointController],
  providers: [PrismaService, PointToPointService],
})
export class PointToPointModule {}
