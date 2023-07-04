import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FeaturesController],
  providers: [PrismaService, FeaturesService],
})
export class FeaturesModule {}
