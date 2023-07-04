import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from "@nestjs/common";
import { PackageServiceService } from "./package_service.service";
import { CreatePackageServiceDto } from "./dto/create-package_service.dto";
import { UpdatePackageServiceDto } from "./dto/update-package_service.dto";

@Controller("package-service")
export class PackageServiceController {
  constructor(private readonly packageServiceService: PackageServiceService) {
  }

  @Post("/create")
  async create(@Body() body: CreatePackageServiceDto) {
    try {
      return await this.packageServiceService.create(body);
    } catch (err) {
      throw new HttpException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
           "Internal server error"
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("/get-all-packages")
  async findAll(@Query("page") page: string = "1", @Query("limit") limit: string = "5", @Query("searchQuery") searchQuery: string) {
    try {
      return await this.packageServiceService.findAll({
        limit: Number(limit),
        page: Number(page),
        searchQuery: searchQuery
      });
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

  @Get("/get-package/:id")
  async findOne(@Param("id") id: string) {
    try {
      return await this.packageServiceService.findOne(+id);
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

  @Patch("/update/:id")
  async update(@Param("id") id: string, @Body() body: UpdatePackageServiceDto) {
    try{
      return await this.packageServiceService.update(+id, body);
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

  @Delete("/delete/:id")
  async remove(@Param("id") id: string) {
    try{
      return await  this.packageServiceService.remove(+id);
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
