import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLocExceptionDto } from 'src/car/dto/create-loc-exception.dto';
import { CreateSlabDto } from 'src/car/dto/create-slab.dto';
import { PrismaService } from 'src/prisma.service';
import { CalculatePriceDTO } from './dto/calculate-price.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ServiceSelectDto } from './dto/service-select.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { CarListDTO } from './dto/car-list-dto';
import { CreateAdminReservationDto } from './dto/create-admin-reservation.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async adminReservation(createReservationDto: CreateAdminReservationDto) {
    try {
      console.log('Usama bhi APi hit',CreateAdminReservationDto);

      const newReservation = await this.prismaService.reservations.create({
        data: {
          // service_id: createReservationDto.service_id,
          // order_number: createReservationDto.order_number,
          // pick_up_loc_name: createReservationDto.pick_up_loc_name,
          // drop_off_loc_name: createReservationDto.drop_off_loc_name,
          // pick_up_date: createReservationDto.pick_up_date,
          // flight_no: createReservationDto.flight_no,
          // airline: createReservationDto.airline,
          // maximum_passenger: createReservationDto.maximum_passenger,
          // maximum_luggage: createReservationDto.maximum_luggage,
          // car_id: createReservationDto.car_id,
          // tax: createReservationDto.tax,
          // price: createReservationDto.price,

          service_id: createReservationDto.service_id,
          car_id: createReservationDto.car_id,
          order_number: createReservationDto.order_number,
          pick_up_loc_name: createReservationDto.pick_up_loc_name,
          pick_up_postal_code: null,
          pick_up_lat: null,
          pick_up_lon: null,
          drop_off_loc_name: createReservationDto.drop_off_loc_name,
          drop_off_postal_code: null,
          drop_off_lat: null,
          drop_off_lon: null,
          airline: createReservationDto.airline,
          flight_no: createReservationDto.flight_no,
          no_of_hours: null,
          pick_up_date: createReservationDto.pick_up_date,
          price: createReservationDto.price,
          tax: createReservationDto.tax,
          customer_first_name: null,
          customer_last_name: null,
          customer_phone: null,
          customer_cnic: null,
          customer_email: null,
          maximum_passenger: createReservationDto.maximum_passenger,
          maximum_luggage: createReservationDto.maximum_luggage,
          special_instruction: createReservationDto.special_instruction ,
        },
      });
      return {
        status: newReservation ? 'success' : 'failed',
        message: newReservation
          ? 'Record created successfully!'
          : 'No record created!',
        data: newReservation,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createReservationDto: CreateReservationDto) {
    try {
      // const status = createReservationDto.status ? true : false;
      const order_number = `RES-${this.generateRandomID()}`;
      // console.log(order_number);
      let data = {
        service_id: createReservationDto.sub_service_id,
        car_id: createReservationDto?.car_id ?? null,
        order_number: order_number,
        pick_up_loc_name: createReservationDto.pick_up_loc_name,
        pick_up_postal_code: createReservationDto.pick_up_postal_code,
        pick_up_lat: createReservationDto.pick_up_lat,
        pick_up_lon: createReservationDto.pick_up_long,
        drop_off_loc_name: createReservationDto.drop_off_loc_name,
        drop_off_postal_code: createReservationDto.drop_off_postal_code,
        drop_off_lat: createReservationDto.drop_off_lat,
        drop_off_lon: createReservationDto.drop_off_long,
        airline: createReservationDto.airline,
        flight_no: createReservationDto.flight_no,
        no_of_hours: createReservationDto.no_of_hours,
        pick_up_date: createReservationDto.pick_up_date,
        price: createReservationDto.price,
        tax: createReservationDto.tax,
        customer_first_name: createReservationDto.customer_first_name,
        customer_last_name: createReservationDto.customer_last_name,
        customer_phone: createReservationDto.customer_phone,
        customer_cnic: createReservationDto.customer_phone,
        customer_email: createReservationDto.customer_email,
        maximum_passenger: createReservationDto.maximum_passenger,
        maximum_luggage: createReservationDto.maximum_luggage,
        special_instruction: createReservationDto.special_request
      };
      if (createReservationDto.car_id === null) {
        delete data.car_id;
      }
      const newReservation = await this.prismaService.reservations.create({
        data,
      });
      return {
        status: newReservation ? 'success' : 'failed',
        message: newReservation
          ? 'Record created successfully!'
          : 'No record created!',
        data: newReservation,
      };
    } catch (err) {
      console.log(err);

      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const allReservations = await this.prismaService.reservations.findMany({
        include: {
          sub_services: {
            select: {
              name: true,
            },
          },
          cars: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      const res = allReservations.map((reservation) => {
        return {
          id: reservation.id,
          service_id: reservation.service_id,
          car_id: reservation.car_id,
          pick_up_loc_name: reservation.pick_up_loc_name,
          pick_up_postal_code: reservation.pick_up_postal_code,
          pick_up_lat: reservation.pick_up_lat,
          pick_up_lon: reservation.pick_up_lon,
          drop_off_loc_name: reservation.drop_off_loc_name,
          drop_off_postal_code: reservation.drop_off_postal_code,
          drop_off_lat: reservation.drop_off_lat,
          drop_off_lon: reservation.drop_off_lon,
          airline: reservation.airline,
          flight_no: reservation.flight_no,
          pick_up_date: reservation.pick_up_date,
          no_of_hours: reservation.no_of_hours,
          price: reservation.price,
          tax: reservation.tax,
          customer_first_name: reservation.customer_first_name,
          customer_last_name: reservation.customer_last_name,
          customer_phone: reservation.customer_phone,
          customer_cnic: reservation.customer_phone,
          customer_email: reservation.customer_email,
          maximum_passenger: reservation.maximum_passenger,
          maximum_luggage: reservation.maximum_luggage,
          service_name: reservation.sub_services.name,
          car_name: reservation.cars.name,
          created_at: reservation.created_at,
          updated_at: reservation.updated_at,
          isPaid:reservation.isPaid,
          specialInstruction:reservation.special_instruction
        };
      });
      return {
        status: allReservations.length > 0 ? 'success' : 'failed',
        message:
          allReservations.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: res,
      };
    } catch (err) {
      console.log("ERROR:",err);
      
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const reservation = await this.prismaService.reservations.findUnique({
        where: { id },
      });
      return {
        status: reservation ? 'success' : 'failed',
        message: reservation
          ? 'Records found successfully!'
          : 'No records found!',
        data: reservation || {},
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      const singleRsrv = await this.prismaService.reservations.findUnique({
        where: {
          id,
        },
      });
      const updateReservation = await this.prismaService.reservations.update({
        where: { id },
        data: {
          service_id:
            updateReservationDto.sub_service_id || singleRsrv.service_id,
          car_id: updateReservationDto.car_id || singleRsrv.car_id,
          pick_up_loc_name:
            updateReservationDto.pick_up_loc_name ||
            singleRsrv.pick_up_loc_name,
          pick_up_postal_code:
            updateReservationDto.pick_up_postal_code ||
            singleRsrv.pick_up_postal_code,
          pick_up_lat:
            updateReservationDto.pick_up_lat || singleRsrv.pick_up_lat,
          pick_up_lon:
            updateReservationDto.pick_up_lon || singleRsrv.pick_up_lon,
          drop_off_loc_name:
            updateReservationDto.drop_off_loc_name ||
            singleRsrv.drop_off_loc_name,
          drop_off_postal_code:
            updateReservationDto.drop_off_postal_code ||
            singleRsrv.drop_off_postal_code,
          drop_off_lat:
            updateReservationDto.drop_off_lat || singleRsrv.drop_off_lat,
          drop_off_lon:
            updateReservationDto.drop_off_long || singleRsrv.drop_off_lon,
          airline: updateReservationDto.airline || singleRsrv.airline,
          flight_no: updateReservationDto.flight_no || singleRsrv.flight_no,
          pick_up_date:
            updateReservationDto.pick_up_date || singleRsrv.pick_up_date,
          no_of_hours:
            updateReservationDto.no_of_hours || singleRsrv.no_of_hours,
          price: updateReservationDto.price || singleRsrv.price,
          tax: updateReservationDto.tax || singleRsrv.tax,
          customer_first_name:
            updateReservationDto.customer_first_name ||
            singleRsrv.customer_first_name,
          customer_last_name:
            updateReservationDto.customer_last_name ||
            singleRsrv.customer_last_name,
          customer_phone:
            updateReservationDto.customer_phone || singleRsrv.customer_phone,
          customer_cnic:
            updateReservationDto.customer_phone || singleRsrv.customer_cnic,
          customer_email:
            updateReservationDto.customer_email || singleRsrv.customer_email,
          maximum_passenger:
            updateReservationDto.maximum_passenger ||
            singleRsrv.maximum_passenger,
          maximum_luggage:
            updateReservationDto.maximum_luggage || singleRsrv.maximum_luggage,
        },
      });
      return {
        status: updateReservation ? 'success' : 'failed',
        message: updateReservation
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateReservation,
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.reservations.delete({
        where: { id },
      });
      return {
        status: 'success',
        message: 'Record deleted successfully!',
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCarsByService(dto: ServiceSelectDto) {
    try {
      let cars = [];
      let tax = 0;
      let sub_serviceId = dto.sub_service_id;
      let passenger = dto.maximum_passenger;
      let luggage = dto.maximum_luggage;
      // finding parent service id from subservice table through subservice id
      const service_id = await this.prismaService.sub_services.findFirst({
        where: {
          id: sub_serviceId,
          isActive: true,
        },
        select: {
          service_id: true,
        },
      });
      if (!service_id) {
        return {
          status: 'failed',
          message: 'Record Not Found',
          data: null,
          error: true,
        };
      }
      // because prisma is returning an object so we extract field service_id from that object
      let serviceId = service_id.service_id;
      const serviceTax = await this.prismaService.gratuities.findFirst({
        where: {
          service_id: serviceId,
        },
      });
      const serviceTaxList = await this.prismaService.gratuities.findMany({
        where: {
          service_id: serviceId,
        },
        select: {
          price: true,
          percentage: true,
          name: true,
        },
      });

      // console.log('tax', serviceTax);

      // Airport Service or Point to Point Service or Airport Drop-off
      if (
        (serviceId && serviceId === 1) ||
        (serviceId && serviceId === 2) ||
        (serviceId && serviceId === 6)
      ) {
        let pickUpPostalCode = dto.pick_up_postal_code;
        let dropOffPostalCode = dto.drop_off_postal_code;

        let pickUpLat = dto.pick_up_lat;
        let pickUpLong = dto.pick_up_long;
        let dropOffLat = dto.drop_off_lat;
        let dropOffLong = dto.drop_off_long;

        cars = await this.prismaService.cars.findMany({
          where: {
            maximum_luggage: {
              gte: dto.maximum_luggage,
            },
            passenger_seats: {
              gte: dto.maximum_passenger,
            },
            car_type: 'Other',
          },
          include: {
            slabs: true,
            car_prices: true,
          },
          orderBy: {
            fixed_price: 'asc',
          },
        });

        // console.log('cars------>', cars);

        // check if pik_up and drop_off exist in location exceptions
        let locationExceptions =
          await this.prismaService.location_exceptions.findFirst({
            where: {
              pick_up_postal_code: pickUpPostalCode,
              drop_off_postal_code: dropOffPostalCode,
            },
          });
        if (!locationExceptions) {
          locationExceptions =
            await this.prismaService.location_exceptions.findFirst({
              where: {
                pick_up_postal_code: dropOffPostalCode,
                drop_off_postal_code: pickUpPostalCode,
              },
            });
        }
        if (locationExceptions) {
          cars = cars.map((car) => {
            let actualFair = car.fixed_price + locationExceptions.price;
            const calculatedTax = this.calculateTax(serviceTaxList, actualFair);

            return {
              id: car.id,
              name: car.name,
              base_price: Number(actualFair.toFixed(2)),
              tax: Number(calculatedTax.tax.toFixed(2)),
              price: Number(calculatedTax.calculatedPrice.toFixed(2)),
              image: car.image,
              passengers: car.passenger_seats,
              luggages: car.maximum_luggage,
              service_name: serviceTaxList ?? null,
            };
          });
        } else {
          let totalMiles = await this.getMapBoxDistance(
            pickUpLat,
            pickUpLong,
            dropOffLat,
            dropOffLong,
          );

          cars = cars?.map((car) => {
            if (car?.slabs.length > 0) {
              let filteredSlab = car.slabs.find((slab) => {
                return (
                  slab.initial_distance <= totalMiles &&
                  slab.final_distance >= totalMiles
                );
              });

              if (filteredSlab) {
                // console.log('in filtered slabs');
                let slabPrice = filteredSlab?.price;
                let actualFair = slabPrice * totalMiles + car?.fixed_price;
                const calculatedTax = this.calculateTax(
                  serviceTaxList,
                  actualFair,
                );
                if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(actualFair.toFixed(2)),
                    tax: Number(calculatedTax.tax.toFixed(2)),
                    price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                } else {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(car.minimum_fare.toFixed(2)),
                    tax: Number(car.minimum_fare.toFixed(2)),
                    price: Number(car.minimum_fare.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                }
              } else {
                // console.log('no slab');

                // No slab found
                let actualFair =
                  car.per_mile_rate * totalMiles + car?.fixed_price;
                const calculatedTax = this.calculateTax(
                  serviceTaxList,
                  actualFair,
                );
                if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(actualFair.toFixed(2)),
                    tax: Number(calculatedTax.tax.toFixed(2)),
                    price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                } else {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(car.minimum_fare.toFixed(2)),
                    tax: Number(car.minimum_fare.toFixed(2)),
                    price: Number(car.minimum_fare.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                }
              }
            } else if (car?.car_prices.length > 0) {
              const date = new Date(dto.pick_up_date);
              const options = { weekday: 'long', timeZone: 'UTC' } as const;
              const dayOfWeek = date.toLocaleDateString('en-US', options);
              const carPriceDetails = car?.car_prices.find(
                (price) => price.car_price_type_id === 2,
              );
              if (carPriceDetails) {
                const finalPrice =
                  carPriceDetails[dayOfWeek.toLowerCase()] ?? car.per_mile_rate;
                let actualFair = finalPrice * totalMiles + car?.fixed_price;
                const calculatedTax = this.calculateTax(
                  serviceTaxList,
                  actualFair,
                );
                if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(actualFair.toFixed(2)),
                    tax: Number(calculatedTax.tax.toFixed(2)),
                    price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                }
              }

              return {
                id: car.id,
                name: car.name,
                base_price: Number(car.minimum_fare.toFixed(2)),
                tax: Number(car.minimum_fare.toFixed(2)),
                price: Number(car.minimum_fare.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            } else {
              // Regular Case
              // Selected car → Per mile rate * total miles + tax - coupons
              let actualFair =
                car.per_mile_rate * totalMiles + car?.fixed_price;
              const calculatedTax = this.calculateTax(
                serviceTaxList,
                actualFair,
              );
              if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
                return {
                  id: car.id,
                  name: car.name,
                  base_price: Number(actualFair.toFixed(2)),
                  tax: Number(calculatedTax.tax.toFixed(2)),
                  price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                  image: car.image,
                  passengers: car.passenger_seats,
                  luggages: car.maximum_luggage,
                  service_name: serviceTaxList ?? null,
                };
              }
              return {
                id: car.id,
                name: car.name,
                base_price: Number(car.minimum_fare.toFixed(2)),
                tax: Number(car.minimum_fare.toFixed(2)),
                price: Number(car.minimum_fare.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            }
          });
        }
      }
      // Hourly Service
      else if (serviceId && serviceId === 3) {
        let noOfHours = dto.no_of_hours;

        cars = await this.prismaService.cars.findMany({
          where: {
            minimum_hours: {
              lte: noOfHours,
            },
            maximum_luggage: {
              gte: dto.maximum_luggage,
            },
            passenger_seats: {
              gte: dto.maximum_passenger,
            },
            car_type: 'Other',
          },
          include: {
            car_prices: true,
          },
        });
        if(cars.length == 0){
          cars = await this.prismaService.cars.findMany({
            where: {
              minimum_hours: {
                gte: noOfHours,
              },
              maximum_luggage: {
                gte: dto.maximum_luggage,
              },
              passenger_seats: {
                gte: dto.maximum_passenger,
              },
              car_type: 'Other',
            },
            include: {
              car_prices: true,
            },
          });
        }
        cars = cars?.map((car) => {
          if (car?.car_prices.length > 0) {
            let countHours = -1;
            if (noOfHours > 24) {
              countHours = noOfHours / 24;
            }
            let date = new Date(dto.pick_up_date);
            let calculatedTax = 0.0;
            let calculatedTaxObject = [];
            while (countHours > 0) {
              const options = { weekday: 'long', timeZone: 'UTC' } as const;
              const dayOfWeek = date.toLocaleDateString('en-US', options);
              const carPriceDetails = car?.car_prices.find(
                (price) => price.car_price_type_id === 1,
              );
              date.setDate(date.getDate() + 1);
              countHours--;
              if (carPriceDetails) {
                const finalPrice =
                  carPriceDetails[dayOfWeek.toLowerCase()] ?? car.hourly_rate;
                let actualFair = finalPrice * car.hourly_rate;
                const tax = this.calculateTax(serviceTaxList, actualFair);
                calculatedTaxObject.push(tax);
                calculatedTax += tax.calculatedPrice;
              }
            }
            if (calculatedTax > 0.0 && calculatedTax > car.minimum_fare) {
              return {
                id: car.id,
                name: car.name,
                base_price: Number(
                  calculatedTaxObject[0].calculatedPrice.toFixed(2),
                ),
                tax: Number(calculatedTaxObject[0].tax.toFixed(2)),
                price: Number(calculatedTax.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            } else if (
              noOfHours <= 24 &&
              countHours <= -1 &&
              calculatedTax === 0.0
            ) {
              const options = { weekday: 'long', timeZone: 'UTC' } as const;
              const dayOfWeek = date.toLocaleDateString('en-US', options);
              const carPriceDetails = car?.car_prices.find(
                (price) => price.car_price_type_id === 1,
              );

              if (carPriceDetails) {
                const finalPrice =
                  carPriceDetails[dayOfWeek.toLowerCase()] ?? car.hourly_rate;
                let actualFair = finalPrice * car.hourly_rate;
                const calculatedTax = this.calculateTax(
                  serviceTaxList,
                  actualFair,
                );
                if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
                  return {
                    id: car.id,
                    name: car.name,
                    base_price: Number(actualFair.toFixed(2)),
                    tax: Number(calculatedTax.tax.toFixed(2)),
                    price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                    image: car.image,
                    passengers: car.passenger_seats,
                    luggages: car.maximum_luggage,
                    service_name: serviceTaxList ?? null,
                  };
                }
                return {
                  id: car.id,
                  name: car.name,
                  base_price: Number(car.minimum_fare.toFixed(2)),
                  tax: Number(car.minimum_fare.toFixed(2)),
                  price: Number(car.minimum_fare.toFixed(2)),
                  image: car.image,
                  passengers: car.passenger_seats,
                  luggages: car.maximum_luggage,
                  service_name: serviceTaxList ?? null,
                };
              }
              return {
                id: car.id,
                name: car.name,
                base_price: Number(car.minimum_fare.toFixed(2)),
                tax: Number(car.minimum_fare.toFixed(2)),
                price: Number(car.minimum_fare.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            } else {
              return {
                id: car.id,
                name: car.name,
                base_price: Number(car.minimum_fare.toFixed(2)),
                tax: Number(car.minimum_fare.toFixed(2)),
                price: Number(car.minimum_fare.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            }
          } else {
            let actualFair = car.hourly_rate * noOfHours;
            const calculatedTax = this.calculateTax(serviceTaxList, actualFair);
            if (calculatedTax?.calculatedPrice >= car.minimum_fare) {
              return {
                id: car.id,
                name: car.name,
                base_price: Number(actualFair.toFixed(2)),
                tax: Number(calculatedTax.tax.toFixed(2)),
                price: Number(calculatedTax.calculatedPrice.toFixed(2)),
                image: car.image,
                passengers: car.passenger_seats,
                luggages: car.maximum_luggage,
                service_name: serviceTaxList ?? null,
              };
            }
            return {
              id: car.id,
              name: car.name,
              base_price: Number(car.minimum_fare.toFixed(2)),
              tax: Number(car.minimum_fare.toFixed(2)),
              price: Number(car.minimum_fare.toFixed(2)),
              image: car.image,
              passengers: car.passenger_seats,
              luggages: car.maximum_luggage,
              service_name: serviceTaxList ?? null,
            };
          }
        });
      }

      // Tour Service
      else if (serviceId && serviceId === 5) {
        const tour = await this.prismaService.sub_services.findFirst({
          where: {
            id: dto?.sub_service_id,
          },
          include: {
            cars: true,
          },
        });
        let tourTime = await this.prismaService.timeslots.findFirst({
          where: {
            id: dto.time,
          },
        });
        let tourFinalTime = null;
        if (tourTime) {
          tourFinalTime = moment(tourTime?.time)
            .utc()
            .format('YYYY-MM-DD HH:mm');
        }
        if (tour) {
          const actualFare =
            tour.price_per_passenger * dto?.maximum_passenger +
            (tour?.cars?.fixed_price ?? 0);
          const { tax, calculatedPrice } = this.calculateTax(
            serviceTaxList,
            actualFare,
          );
          return {
            status: tour ? 'success' : 'failed',
            message: tour ? 'Records found successfully!' : 'No records found!',
            data: { ...tour, time: tourFinalTime },

            tax: tax,
            price: calculatedPrice,
            base_price: calculatedPrice,
            service_name: serviceTaxList,
          };
        } else {
          return {
            status: tour ? 'success' : 'failed',
            message: tour ? 'Records found successfully!' : 'No records found!',
            data: tour,
            tax: tax,
            price: 0,
            base_price: 0,
            service_name: serviceTaxList,
          };
        }
      }

      // Package Service
      else if (serviceId && serviceId === 4) {
        const packagesList = await this.prismaService.sub_services.findFirst({
          where: {
            isActive: true,
            id:sub_serviceId
          },
          include: {
            cars: true,
          },
        });
        if (packagesList) {
            const  price_per_passenger  = packagesList.price_per_passenger;
            const { tax, calculatedPrice } = this.calculateTax(
              serviceTaxList,
              packagesList.price_per_passenger + packagesList.cars?.fixed_price ?? 0,
            );
            delete packagesList.price_per_passenger;
          return {
            status: packagesList ? 'success' : 'failed',
            message:
              packagesList
                ? 'Records found successfully!'
                : 'No records found!',
            data: {
              tax,
              price: calculatedPrice,
              ...packagesList,
              base_price: calculatedPrice,
            },
            service_name: serviceTaxList,
          };
        } else {
          return {
            status: packagesList? 'success' : 'failed',
            message:
              packagesList
                ? 'Records found successfully!'
                : 'No records found!',
            data: packagesList,
            tax: tax,
            price: 0,
            service_name: serviceTaxList,
          };
        }
      }
      if (cars?.length > 0) {
        cars = cars.filter((car) => car !== null && car);
        cars.sort((a, b) => a.base_price - b.base_price);
      }
      return {
        status: cars.length > 0 ? 'success' : 'failed',
        message:
          cars.length > 0 ? 'Records found successfully!' : 'No records found!',
        data: cars,
      };
    } catch (err) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target || err?.meta?.cause || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMapBoxDistance(
    pickUpLat: number,
    pickUpLong: number,
    dropOffLat: number,
    dropOffLong: number,
  ) {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickUpLong}%2C${pickUpLat}%3B${dropOffLong}%2C${dropOffLat}?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${this.configService.get(
      'MAPBOX_API_KEY',
    )}`;
    try {
      const response = await this.httpService.axiosRef.get(url);
      // console.log('dist', response.data.routes[0].distance);
      // return response.data.routes[0].distance / 1609.34;
      return response.data.routes[0].distance / 1000;
    } catch (error) {
      console.error(`Error retrieving MapBox distance: ${error}`);
      return null;
    }
  }

  // helper function used in distance function
  toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  // calculate complete tax
  calculateTax(serviceTaxList, actualFair) {
    let calculatedPrice = actualFair;
    let tax = 0;
    for (const serviceTax of serviceTaxList) {
      if (serviceTax?.price === 0) {
        // tax is in percentage
        tax = this.calculateTaxPercentage(actualFair, serviceTax.percentage);
        calculatedPrice = calculatedPrice + tax;
      } else if (serviceTax?.percentage === 0) {
        // tax is in amount
        calculatedPrice = calculatedPrice + serviceTax.price;
        tax = serviceTax.price;
      } else {
        calculatedPrice = actualFair;
      }
    }
    return { tax, calculatedPrice };
  }

  // calculate tax price with percentage
  calculateTaxPercentage(price: number, tax: number) {
    return (price * tax) / 100;
  }

  // random id generator function
  generateRandomID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomLetter = characters[randomIndex];
      id += randomLetter;
    }
    return id;
  }
}

// 74.267608 31.426097
// 74.273473788 31.495815529
