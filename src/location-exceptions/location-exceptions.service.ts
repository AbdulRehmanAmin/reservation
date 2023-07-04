import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateLocationExceptionDto } from "./dto/create-location-exception.dto";
import { UpdateLocationExceptionDto } from "./dto/update-location-exception.dto";
import { createReadStream } from "fs";
import * as csvParser from "csv-parser";
import * as path from "path";
import { validate } from "class-validator";

@Injectable()
export class LocationExceptionsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createLocationExceptionDto: CreateLocationExceptionDto) {
    try {
      const newLocationException =
        await this.prismaService.location_exceptions.create({
          data: { ...createLocationExceptionDto }
        });

      return {
        status: newLocationException ? "success" : "failed",
        message: newLocationException
          ? "Record created successfully!"
          : "No record created!",
        data: newLocationException
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async processCsv(filePath: string) {
    return new Promise((resolve, reject) => {
      let errorRecords = []
      const stream = createReadStream(filePath);
      stream
        .pipe(csvParser({ separator: "," }))
        .on("data", async (row) => {
          const pick_up_postal_code = row["pick_up_postal_code"];
          const drop_off_postal_code = row["drop_off_postal_code"];
          const price = parseFloat(row.price);
          if (!pick_up_postal_code || !drop_off_postal_code || isNaN(price)) {
            errorRecords.push(row);
            return;
          }
          const body = {
            pick_up_postal_code,
            drop_off_postal_code,
            price: price,
            pick_up_loc_name: null,
            drop_off_loc_name: null
          }
          await this.create(body);
        })
        .on("end", () => {
          if (errorRecords.length > 0) {
            console.log('Error in Csv upload');
            reject({
              status: 'fail',
              message: 'Some records were not created due to missing or invalid values.',
              data: errorRecords,
            });
          } else {
            resolve({
              status: 'success',
              message: 'Records created successfully!',
              data: null,
            });
          }
        })
        .on("error", () => {
          console.log('Error in Csv upload');
          reject({
            status: 'fail',
            message: 'Records not created!',
            data: null,
          });
        })
    })
  }



  async findAll() {
    try {
      const allLocationExceptions =
        await this.prismaService.location_exceptions.findMany();
      return {
        status: allLocationExceptions.length > 0 ? "success" : "failed",
        message:
          allLocationExceptions.length > 0
            ? "Records found successfully!"
            : "No records found!",
        data: allLocationExceptions
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findOne(id: number) {
    try {
      const singleLocExcp = await this.prismaService.manufacturers.findUnique({
        where: {
          id
        }
      });
      return {
        status: singleLocExcp ? "success" : "failed",
        message: singleLocExcp
          ? "Record found successfully!"
          : "No record found!",
        data: singleLocExcp || {}
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(
    id: number,
    updateLocationExceptionDto: UpdateLocationExceptionDto
  ) {
    try {
      const singleLocExcp =
        await this.prismaService.location_exceptions.findUnique({
          where: {
            id
          }
        });
      const updateLocationException =
        await this.prismaService.location_exceptions.update({
          where: {
            id
          },
          data: {
            pick_up_postal_code:
              updateLocationExceptionDto.pick_up_postal_code ||
              singleLocExcp.pick_up_postal_code,
            drop_off_postal_code:
              updateLocationExceptionDto.drop_off_postal_code ||
              singleLocExcp.drop_off_postal_code,
            pick_up_loc_name:
              updateLocationExceptionDto.pick_up_loc_name ||
              singleLocExcp.pick_up_loc_name,
            drop_off_loc_name:
              updateLocationExceptionDto.drop_off_loc_name ||
              singleLocExcp.drop_off_loc_name,
            price: updateLocationExceptionDto.price || singleLocExcp.price
          }
        });
      return {
        status: updateLocationException ? "success" : "failed",
        message: updateLocationException
          ? "Record updated successfully!"
          : "No record updated!",
        data: updateLocationException
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async remove(id: number) {
    try {
      const deleteLocationException =
        await this.prismaService.location_exceptions.delete({
          where: {
            id
          }
        });
      return {
        status: "success",
        message: "Record deleted successfully!",
        data: deleteLocationException
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
