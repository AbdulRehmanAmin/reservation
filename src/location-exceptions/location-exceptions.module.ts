import { Module } from '@nestjs/common';
import { LocationExceptionsService } from './location-exceptions.service';
import { LocationExceptionsController } from './location-exceptions.controller';
import { PrismaService } from 'src/prisma.service';
import { diskStorage } from "multer";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/csv',
        filename: (req, file, callback) => {
          const filename = `${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [LocationExceptionsController],
  providers: [PrismaService, LocationExceptionsService],
})
export class LocationExceptionsModule {}
