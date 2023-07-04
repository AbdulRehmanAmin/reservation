import { Module } from '@nestjs/common';
import { PackageServiceService } from './package_service.service';
import { PackageServiceController } from './package_service.controller';
import { PrismaService } from "../prisma.service";
@Module({
  controllers: [PackageServiceController],
  providers: [PackageServiceService,PrismaService]
})
export class PackageServiceModule {}
