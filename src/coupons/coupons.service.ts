import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";
import { CreateVehicleTypeDto } from "../vehicle-types/dto/create-vehicle-type.dto";
import { UpdateVehicleTypeDto } from "../vehicle-types/dto/update-vehicle-type.dto";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CouponsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create(createCouponDto: CreateCouponDto) {
    try {
      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();
      const coupon = await this.prismaService.coupons.create({
        data: { ...createCouponDto, created_at, updated_at }
      });

      return {
        status: coupon ? "success" : "failed",
        message: { ...coupon, created_at, updated_at }
          ? "Record created successfully!"
          : "No record created!",
        data: coupon
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

  async findAll() {
    try {
      const coupons = await this.prismaService.coupons.findMany();
      return {
        status: coupons.length > 0 ? "success" : "failed",
        message:
          coupons.length > 0
            ? "Records found successfully!"
            : "No records found!",
        data: coupons
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
      const coupon = await this.prismaService.coupons.findUnique({
        where: { id }
      });
      return {
        status: coupon ? "success" : "failed",
        message: coupon ? "Records found successfully!" : "No records found!",
        data: coupon || {}
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

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    try {
      const updatedCoupon = await this.prismaService.coupons.update({
        where: { id },
        data: updateCouponDto
      });
      return {
        status: updatedCoupon ? "success" : "failed",
        message: updatedCoupon
          ? "Record updated successfully!"
          : "No record updated!",
        data: updatedCoupon
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

  async remove(id: number) {
    try {
      const coupon = await this.prismaService.coupons.delete({
        where: { id }
      });
      return {
        status: "success",
        message: "Record deleted successfully!",
        data: coupon
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
