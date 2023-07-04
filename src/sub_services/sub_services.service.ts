import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubServiceDto } from './dto/create-sub_service.dto';
import { UpdateSubServiceDto } from './dto/update-sub_service.dto';
import { PrismaService } from '../prisma.service';
import * as moment from 'moment-timezone';

const dayjs = require('dayjs');
const UTC = require('dayjs/plugin/utc');

dayjs.extend(UTC);

@Injectable()
export class subServicesService {
  constructor(private prismaService: PrismaService) {}

  async createSubService(body: CreateSubServiceDto) {
    try {
      let timeEntries, rembody;
      rembody = body;
      let time;
      if (body.time) {
        const { time: timeValue, ...updatedBody } = body;
        time = timeValue;
        rembody = updatedBody;
      }
      if(rembody.car_id===0){
        delete rembody.car_id
      }
      const subService = await this.prismaService.sub_services.create({
        data: {
          ...rembody,
          created_at: new Date().toISOString(),
        },
      });
      if (body.service_id === 5) {
        timeEntries = await Promise.all(
          time.map(async (entry) => {
            const timeSlot = await this.prismaService.timeslots.create({
              data: {
                time: new Date(entry).toISOString(),
                // time: entry,
                sub_service_id: subService.id,
                created_at: new Date().toISOString(),
              },
            });
            return timeSlot;
          }),
        );
      }
      return {
        status: subService ? 'success' : 'failed',
        message: subService
          ? 'Records Created successfully!'
          : 'No records Created!',
        data: subService,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message:
            err?.meta?.target ||
            err?.meta?.cause ||
            err.message ||
            'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const sub_services = await this.prismaService.sub_services.findMany({
        where: {
          isActive: true,
        },
        include: {
          cars: { select: { car_model: true } },
          services: { select: { Name: true } },
          timeslots: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      sub_services.forEach(el=>{
        if(el.timeslots){
          el.timeslots.forEach(slot => {
                      // @ts-ignore
            slot.time = moment(slot.time).utc().format('YYYY-MM-DD HH:mm');
                      return slot;
                    });
        }
      })
      return {
        status: sub_services.length ? 'success' : 'failed',
        totalRecords: sub_services.length,
        message: sub_services.length
          ? 'Records found successfully!'
          : 'No records found!',
        data: sub_services,
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

  // Previous Code------------
  // async findAll(param: { limit: number, page: number, searchQuery: string }) {
  //   try {
  //     let { limit, page, searchQuery } = param;
  //     let where = {}, totalRecords = 0, tour;
  //     if (searchQuery) {
  //       where = {
  //         AND: [
  //           { title: { contains: searchQuery } },
  //           { isActive: true }
  //         ]
  //       };
  //       totalRecords = await this.prismaService.tours.count({ where });
  //       tour = await this.prismaService.tours.findMany({
  //         skip: (page - 1) * limit,
  //         take: limit,
  //         where,
  //         orderBy: {
  //           created_at: "desc"
  //         },
  //         include: {
  //           cars: {
  //             select: {
  //               name: true,
  //               id: true
  //             }
  //           }, timeslots: {
  //             select: {
  //               time: true
  //             }
  //           }
  //         }
  //       });
  //     } else if (limit === 0) {
  //       totalRecords = await this.prismaService.tours.count({
  //         where: {
  //           isActive: true
  //         }
  //       });
  //       tour = await this.prismaService.tours.findMany({
  //         where: {
  //           isActive: true
  //
  //         },
  //         orderBy: {
  //           created_at: "desc"
  //         },
  //         include: {
  //           cars: {
  //             select: {
  //               name: true,
  //               id: true
  //             }
  //           },
  //           timeslots: {
  //             select: {
  //               time: true
  //             }
  //           }
  //         }
  //       });
  //     } else {
  //       totalRecords = await this.prismaService.tours.count({
  //         where: {
  //           isActive: true
  //         }
  //       });
  //       tour = await this.prismaService.tours.findMany({
  //         skip: (page - 1) * limit,
  //         take: limit,
  //         where: {
  //           isActive: true
  //         },
  //         orderBy: {
  //           created_at: "desc"
  //         },
  //         include: {
  //           cars: {
  //             select: {
  //               name: true,
  //               id: true
  //             }
  //           },
  //           timeslots:{
  //             select:{
  //               time:true
  //             }
  //           }
  //         }
  //       });
  //     }
  //     if(tour?.length>0)
  //     {
  //       tour.flatMap(item => {
  //         const updatedTimeslots = item.timeslots.map(slot => {
  //           slot.time = moment(slot.time).utc().format('YYYY-MM-DD HH:mm');
  //           return slot;
  //         });
  //     })
  //     }
  //     return {
  //       status: tour.length ? "success" : "failed",
  //       message:
  //         tour.length
  //           ? "Records found successfully!"
  //           : "No records found!",
  //       data: tour,
  //       totalRecords
  //     };
  //
  //   } catch (err) {
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message:
  //           err?.meta?.target || err?.meta?.cause || "Internal server error"
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  async findOne(
    id: number,
    param: { limit: number; page: number; searchQuery: string },
  ) {
    try {
      let { limit, page, searchQuery } = param;
      let totalRecords = 0,
        service;
      if (id === 5) {
        if (searchQuery) {
          totalRecords = await this.prismaService.sub_services.count({
            where: {
              AND: [
                { name: { contains: searchQuery } },
                { service_id: id },
                { isActive: true },
              ],
            },
          });
          service = await this.prismaService.sub_services.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
              AND: [
                { name: { contains: searchQuery } },
                { service_id: id },
                { isActive: true },
              ],
            },
            orderBy: {
              created_at: 'desc',
            },
            include: {
              services: {
                select: {
                  Name: true,
                },
              },
              timeslots: true,
              cars: {
                select: {
                  name: true,
                  car_model: true,
                },
              },
            },
          });
        } else {
          totalRecords = await this.prismaService.sub_services.count({
            where: {
              AND: [{ service_id: id }, { isActive: true }],
            },
          });
          service = await this.prismaService.sub_services.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
              AND: [{ service_id: id }, { isActive: true }],
            },
            orderBy: {
              created_at: 'desc',
            },
            include: {
              services: {
                select: {
                  Name: true,
                },
              },
              timeslots: {
                where:{
                  isActive:true
                }
              },
              cars: {
                select: {
                  name: true,
                  car_model: true,
                },
              },
            },
          });
        }
        if (service.length > 0) {
          service.forEach((obj) => {
            obj.timeslots.forEach((slot) => {
              // @ts-ignore
              slot.time = moment(slot.time)
                .format('YYYY-MM-DD HH:mm')
                .toString();
            });
          });
        }
      } else {
        if (searchQuery) {
          totalRecords = await this.prismaService.sub_services.count({
            where: {
              AND: [
                { name: { contains: searchQuery } },
                { service_id: id },
                { isActive: true },
              ],
            },
          });
          service = await this.prismaService.sub_services.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
              AND: [
                { name: { contains: searchQuery } },
                { service_id: id },
                { isActive: true },
              ],
            },
            orderBy: {
              created_at: 'desc',
            },
            include: {
              services: {
                select: {
                  Name: true,
                },
              },
              cars: {
                select: {
                  name: true,
                  car_model: true,
                },
              },
            },
          });
        } else {
          totalRecords = await this.prismaService.sub_services.count({
            where: {
              AND: [{ service_id: id }, { isActive: true }],
            },
          });
          service = await this.prismaService.sub_services.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
              AND: [{ service_id: id }, { isActive: true }],
            },
            orderBy: {
              created_at: 'desc',
            },
            include: {
              services: {
                select: {
                  Name: true,
                },
              },
              cars: {
                select: {
                  name: true,
                  car_model: true,
                },
              },
            },
          });
        }
      }

      return {
        status: service.length ? 'success' : 'failed',
        totalRecords: totalRecords,
        message: service ? 'Records found successfully!' : 'No records found!',
        data: service,
      };
    } catch (err) {
      console.log(err, '---->');
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

  async update(id: number, body: UpdateSubServiceDto) {
    try {
      const { time_slots: timeSlots, ...remBody } = body;
      let updateSubService;
      if (remBody) {
        console.log(remBody, 'test');

        updateSubService = await this.prismaService.sub_services.update({
          where: {
            id: id,
          },
          data: {
            ...remBody,
            updated_at: new Date().toISOString(),
          },
        });
      }
      if (timeSlots) {
        if (timeSlots.length) {
          // Find the IDs of the time slots from the request
          const requestedTimeSlotIds = timeSlots
            .filter((tour) => tour.id !== null)
            .map((tour) => tour.id);

          // Get the existing time slots for the sub-service
          const existingTimeSlots = await this.prismaService.timeslots.findMany(
            {
              where: {
                sub_service_id: id,
              },
            },
          );

          // Find the IDs of the existing time slots
          const existingTimeSlotIds = existingTimeSlots.map((slot) => slot.id);

          // Find the IDs of the time slots to be deleted
          const deletedTimeSlotIds = existingTimeSlotIds.filter(
            (id) => !requestedTimeSlotIds.includes(id),
          );

          // Delete the time slots that are not included in the request
          if (deletedTimeSlotIds.length > 0) {
            await this.prismaService.timeslots.updateMany({
              where: {
                id: {
                  in: deletedTimeSlotIds,
                },
              },
              data: {
                isActive: false,
              },
            });
          }

          // Update existing time slots
          const updatePromises = timeSlots
            .filter((tour) => tour.id !== null)
            .map((slot) => {
              return this.prismaService.timeslots.update({
                where: {
                  id: slot.id,
                },
                data: {
                  time: new Date(slot.time).toISOString(),
                  updated_at: new Date().toISOString(),
                },
              });
            });

          await Promise.all(updatePromises);

          // Create new time slots
          const newTimeSlots = timeSlots.filter((tour) => tour.id === null);

          if (newTimeSlots.length > 0) {
            const createTimeSlotPromises = newTimeSlots.map((slot) => {
              return this.prismaService.timeslots.create({
                data: {
                  sub_service_id: id,
                  time: new Date(slot.time).toISOString(),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              });
            });

            await Promise.all(createTimeSlotPromises);
          }
        }
      }
      return {
        status: updateSubService ? 'success' : 'failed',
        message: updateSubService
          ? 'Records updated successfully!'
          : 'No records updated!',
        data: {
          tour: updateSubService,
        },
      };
    } catch (err) {
      console.log(err, '--->');
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: err?.stack || err?.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const subService = await this.prismaService.sub_services.update({
        where: {
          id: id,
        },
        data: {
          isActive: false,
        },
      });
      return {
        status: subService ? 'success' : 'failed',
        message: subService
          ? 'Records deleted successfully!'
          : 'No records found to delete!',
        data: null,
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

  // ****---**** Previous Function when all services have separate module ****---****
  // async update(id: number, body: UpdateToursServiceDto) {
  //   try {
  //     const { time_slots: timeSlots, ...tour } = body;
  //     const updateTour = await this.prismaService.tours.update({
  //       where: {
  //         id: id
  //       },
  //       data: {
  //         ...tour,
  //         updated_at: new Date().toISOString()
  //       }
  //     });
  //
  //     if (timeSlots) {
  //       let previousTours = timeSlots.filter((tour) => tour.id !== null);
  //       let newTours = timeSlots.filter((tour) => tour.id === null);
  //
  //       if (newTours?.length > 0) {
  //         const timeArray = newTours.map((timeString) => {
  //           return {
  //             time: new Date(timeString?.time).toISOString(),
  //             tour_id: id,
  //             updated_at: new Date().toISOString(),
  //             created_at: new Date().toISOString()
  //           };
  //         });
  //         await this.prismaService.timeslots.createMany({
  //           data: timeArray
  //         });
  //       }
  //
  //       if (previousTours?.length > 0) {
  //         const updatePromises = previousTours.map(slot => {
  //           return this.prismaService.timeslots.update({
  //             where: { id: slot.id },
  //             data: {
  //               time: new Date(slot.time).toISOString(),
  //               updated_at: new Date().toISOString()
  //             }
  //           });
  //         });
  //         await Promise.all(updatePromises);
  //       }
  //
  //     }
  //     return {
  //       status: updateTour ? "success" : "failed",
  //       message: updateTour
  //         ? "Records updated successfully!"
  //         : "No records updated!",
  //       data: {
  //         tour: updateTour
  //       }
  //     };
  //
  //   } catch (err) {
  //     console.log(err);
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message:
  //           err?.stack || err?.message || "Internal server error"
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  // async remove(id: number) {
  //   try {
  //     const tour = await this.prismaService.tours.update({
  //       where: {
  //         id: id
  //       },
  //       data: {
  //         isActive: false
  //       }
  //
  //     });
  //     return {
  //       status: tour ? "success" : "failed",
  //       message:
  //         tour
  //           ? "Records deleted successfully!"
  //           : "No records found to delete!",
  //       data: null
  //     };
  //   } catch (err) {
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //         message:
  //           err?.meta?.target || err?.meta?.cause || "Internal server error"
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  // Last Function have some Date Time related issues
    async getTimeslots(id: number) {
      try {
        // const currentTime = dayjs().toDate();
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const tour = await this.prismaService.timeslots.findMany({
          where: {
            AND: [
              { sub_service_id: id },
              { isActive: true }
              // { time: { gt: currentTime } }
            ]
          }
        });
        const sub_service = await this.prismaService.sub_services.findFirst({
          where:{
        id:id
          }
        })
        const now = moment().tz(userTimezone);

        const tourTimeSlots = tour.filter((slot: any) => {
          const eventDate = moment.utc(slot.time).tz(userTimezone);
          if (eventDate.isAfter(now)) {
            slot.time = moment(slot.time).utc().format('YYYY-MM-DD HH:mm');

            return slot;
          }
        });

        return {
          status: tourTimeSlots.length ? "success" : "failed",
          message:
            tourTimeSlots.length
              ? "Records found successfully!"
              : "No records found!",
          data: {
            timeSlots:tourTimeSlots,
            pickup_location:sub_service.pickup_location,
            pick_up_lat:sub_service.pickup_lat,
            pick_up_lon:sub_service.pickup_lng
          }
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
}
