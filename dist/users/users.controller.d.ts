import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { ConfigService } from '@nestjs/config';
export declare class UsersController {
    private readonly appService;
    private readonly configService;
    constructor(appService: UsersService, configService: ConfigService);
    getAllUser(): Promise<any>;
    getUsers(): Promise<any>;
    getSingleUser(id: string): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    createUser(body: CreateUserDto): Promise<any>;
    updatePassword(body: {
        email: string;
        password: string;
    }): Promise<any>;
    loginUser(body: LoginUserDto): Promise<any>;
    updateUser(id: string, body: UpdateUserDto): Promise<any>;
    deleteUser(id: string): Promise<any>;
    changeUserPassword(id: string, body: UpdateUserDto): Promise<any>;
}
