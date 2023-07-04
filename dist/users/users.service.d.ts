import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
export declare class UsersService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
    getUsers(): Promise<any>;
    getAllUsers(): Promise<any>;
    singleUser(id: number): Promise<any>;
    createUser(user: CreateUserDto): Promise<any>;
    loginUser(user: LoginUserDto): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    updateUser(id: number, body: UpdateUserDto): Promise<any>;
    deleteUser(id: number): Promise<any>;
    updateUserPassword(data: {
        email: string;
        password: string;
    }): Promise<any>;
    changeUserPassword(id: number, body: UpdateUserDto): Promise<any>;
}
