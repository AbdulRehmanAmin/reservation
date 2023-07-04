import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePackageServiceDto } from "./dto/create-package_service.dto";
import { UpdatePackageServiceDto } from "./dto/update-package_service.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PackageServiceService {
  constructor(private prismaService: PrismaService) {
  }

  async create(body: CreatePackageServiceDto) {
    try {
      const packages = await this.prismaService.package_serivce.create({
        data: {
          ...body,
          created_at: new Date().toISOString()
        }
      });
      return {
        status: packages ? "success" : "failed",
        message: packages ? "Record created successfully!" : "No record created!",
        data: packages
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

  async findAll(param: { limit: number, page: number, searchQuery: string }) {
    try {
      let { limit, page, searchQuery } = param;
      let where = {}, totalRecords = 0, packages;
      if (searchQuery) {
        where = {
          AND: [
            { name: { contains: searchQuery } },
            { isActive: true }
          ]
        };
        totalRecords = await this.prismaService.package_serivce.count({ where });
        packages = await this.prismaService.package_serivce.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where,
          orderBy: {
            created_at: "desc"
          },
          include: {
            cars: {
              select: {
                name: true
              }
            }
          }
        });
      }
      else if(limit===0){
        totalRecords = await this.prismaService.package_serivce.count({
          where: {
            isActive: true
          }
        });
        packages = await this.prismaService.package_serivce.findMany({
          where: {
            isActive: true
          },
          orderBy: {
            created_at: "desc"
          },
          include: {
            cars: {
              select: {
                name: true
              }
            }
          }
        });
      }
      else {
        totalRecords = await this.prismaService.package_serivce.count({
          where: {
            isActive: true
          }
        });
        packages = await this.prismaService.package_serivce.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            isActive: true
          },
          orderBy: {
            created_at: "desc"
          },
          include: {
            cars: {
              select: {
                name: true
              }
            }
          }
        });
      }
      return {
        status: packages.length ? "success" : "failed",
        message:
          packages.length
            ? "Records found successfully!"
            : "No records found!",
        data: packages,
        totalRecords
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
      const packageServiceResponse = await this.prismaService.package_serivce.findFirst({
        where: {
          id: id
        },
        include: {
          cars: {
            select: {
              name: true,
              image: true,
              passenger_seats: true,
              id:true
            }
          }
        }
      });

      return {
        status: "success",
        message:
          packageServiceResponse
            ? "Records found successfully!"
            : "No records found!",
        data: packageServiceResponse
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

  async update(id: number, updatePackageServiceDto: UpdatePackageServiceDto) {
   try{
     const updatePackageService = await this.prismaService.package_serivce.update({
       where: {
         id: id
       },
       data: { updated_at:new Date().toISOString(),
         ...updatePackageServiceDto }
     })
     return {
       status: updatePackageService ? "success" : "failed",
       message: updatePackageService ? "Record Updated successfully!" : "No Record Updated!",
       data: updatePackageService ?? []
     };
   } catch (err) {
     throw new HttpException({
         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
         message:
           err?.meta?.target || err?.meta?.cause || "Internal server error"
       },
       HttpStatus.INTERNAL_SERVER_ERROR
     );
   }
  }

  async remove(id: number) {
    try{
      const removePackageService= await this.prismaService.package_serivce.update({
        where:{
          id:id
        },
        data:{
          isActive:false,
          updated_at: new Date().toISOString()
        }
      })
      return {
        status: removePackageService ? "success" : "failed",
        message: removePackageService ? "Record Deleted successfully!" : "Something Went Wrong",
        data: []
      }

    }catch (err) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
