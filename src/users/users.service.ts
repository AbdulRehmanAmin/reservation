import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  // gel all users include roles and users
  async getUsers(): Promise<any> {
    try {
      const users = await this.prismaService.role_users.findMany({
        include: {
          users: {
            select: {
              first_name: true,
            },
          },
          roles: {
            select: {
              name: true,
            },
          },
        },
      });
      return {
        status: users.length > 0 ? 'success' : 'failed',
        message:
          users.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: users,
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

  // get all users
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.prismaService.users.findMany({});
      return {
        status: users.length > 0 ? 'success' : 'failed',
        message:
          users.length > 0
            ? 'Records found successfully!'
            : 'No records found!',
        data: users,
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

  // get single user
  async singleUser(id: number): Promise<any> {
    try {
      const singleUser = await this.prismaService.users.findUnique({
        where: {
          id,
        },
      });
      return {
        status: singleUser ? 'success' : 'failed',
        message: singleUser ? 'Record found successfully!' : 'No record found!',
        data: singleUser || {},
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

  // create a user
  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      user.password = await bcrypt.hash(user.password, salt);

      const created_at = new Date().toISOString();
      const updated_at = new Date().toISOString();

      const newUser = await this.prismaService.users.create({
        data: {
          ...user,
          status: user.status ? true : false,
          created_at,
          updated_at,
        },
      });

      delete newUser.password;

      return {
        status: newUser ? 'success' : 'failed',
        message: newUser
          ? 'Record created successfully!'
          : 'No record created!',
        data: newUser,
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

  // login the user
  async loginUser(user: LoginUserDto): Promise<any> {
    try {
      const { email, password } = user;

      if (!email || !password) {
        // return { isValid: false, message: 'Email and password are required' };
        throw new HttpException(
          'Email and password are required',
          HttpStatus.UNAUTHORIZED,
        );
      }
      // Find the user with the given email in the database
      const foundUser = await this.prismaService.users.findUnique({
        where: { email },
      });
      if (!foundUser) {
        // return { isValid: false, message: 'Invalid email or password' };
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
      // Compare the provided password with the encrypted password stored in the database
      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch) {
        // return { isValid: false, message: 'Invalid email or password' };
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token = this.jwtService.sign(
        {user:foundUser},
        { secret: this.configService.get('jwt_secret') },
      );

      delete foundUser.password;
      // Return the token to the client
      return { isValid: true, message: 'success', user: foundUser, token };
    } catch (err) {
      throw new HttpException(
        {
          status: err.status,
          message: err.message || 'Internal server error',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  // forgot user password
  async forgotPassword(email: string): Promise<any> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new HttpException(
          {
            status: 'failed',
            message: 'User not found!',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return {
        status: 'success',
        message: 'User found',
        isValid: true,
        user,
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

  // update user data
  async updateUser(id: number, body: UpdateUserDto): Promise<any> {
    try {
      const updated_at = new Date().toISOString();
      // return;
      const updateUser = await this.prismaService.users.update({
        where: {
          id,
        },
        data: { ...body, status: body.status ? true : false, updated_at },
      });
      delete updateUser.password;
      return {
        status: updateUser ? 'success' : 'failed',
        message: updateUser
          ? 'Record updated successfully!'
          : 'No record updated!',
        data: updateUser,
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

  // delete a user
  async deleteUser(id: number): Promise<any> {
    try {
      const deleteUser = await this.prismaService.users.delete({
        where: {
          id,
        },
      });
      if (!deleteUser) {
        throw new HttpException(
          { status: 'failed', message: 'Not deleted!' },
          HttpStatus.NOT_IMPLEMENTED,
        );
        // return { status: 'failed', message: 'Not deleted!' };
      }
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

  // update user password
  async updateUserPassword(data: {
    email: string;
    password: string;
  }): Promise<any> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
      user.password = await hashPassword;
      if (!hashPassword) {
        throw new HttpException(
          {
            status: 'failed',
            message: 'Password not changed!',
            isChanged: false,
          },
          HttpStatus.NOT_IMPLEMENTED,
        );
      }
      return {
        status: 'success',
        message: 'Password changed successfully!',
        isChanged: true,
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

  async changeUserPassword(id: number, body: UpdateUserDto): Promise<any> {
    try {
      //Hashing the password coming from the body

      const saltOrRounds = 10;
      const salt = await bcrypt.genSalt(saltOrRounds);
      const hashPassword = await bcrypt.hash(body.password, salt);

      // Finding the user from db using id and updating the password with the new one
      const updateUser = await this.prismaService.users.update({
        where: {
          id: Number(id),
        },
        data: { password: hashPassword },
      });
      return {
        status: 'success',
        message: 'Password changed successfully!',
        isChanged: true,
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
}
