import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private readonly appService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  // @UseGuards(JwtAuthGuard)

  @Get('/')
  async getAllUser() {
    return this.appService.getAllUsers();
  }

  @Get('/users')
  async getUsers(): Promise<any> {
    return await this.appService.getUsers();
  }

  @Get('/:id')
  async getSingleUser(@Param('id') id: string): Promise<any> {
    return await this.appService.singleUser(+id);
  }

  @Get('/:email')
  async forgotPassword(@Param('email') email: string): Promise<any> {
    return this.appService.forgotPassword(email);
  }

  @Post('/')
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    return await this.appService.createUser(body);
  }

  @Patch('/reset-password')
  async updatePassword(
    @Body() body: { email: string; password: string },
  ): Promise<any> {
    return await this.appService.updateUserPassword(body);
  }

  @Post('/login')
  async loginUser(@Body() body: LoginUserDto): Promise<any> {
    return await this.appService.loginUser(body);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    return await this.appService.updateUser(+id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.appService.deleteUser(+id);
  }

  //Taking user id from param / password from body
  @Patch('change-password/:id')
  async changeUserPassword(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<any> {
    return await this.appService.changeUserPassword(+id, body);
  }
}
