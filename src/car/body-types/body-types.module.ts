import { Module } from '@nestjs/common';
import { BodyTypesService } from './body-types.service';
import { BodyTypesController } from './body-types.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BodyTypesController],
  providers: [PrismaService, BodyTypesService],
})
export class BodyTypesModule {}
