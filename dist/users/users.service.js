"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(prismaService, configService, jwtService) {
        this.prismaService = prismaService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async getUsers() {
        var _a, _b;
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
                message: users.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: users,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getAllUsers() {
        var _a, _b;
        try {
            const users = await this.prismaService.users.findMany({});
            return {
                status: users.length > 0 ? 'success' : 'failed',
                message: users.length > 0
                    ? 'Records found successfully!'
                    : 'No records found!',
                data: users,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async singleUser(id) {
        var _a, _b;
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
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(user) {
        var _a, _b;
        try {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            user.password = await bcrypt.hash(user.password, salt);
            const created_at = new Date().toISOString();
            const updated_at = new Date().toISOString();
            const newUser = await this.prismaService.users.create({
                data: Object.assign(Object.assign({}, user), { status: user.status ? true : false, created_at,
                    updated_at }),
            });
            delete newUser.password;
            return {
                status: newUser ? 'success' : 'failed',
                message: newUser
                    ? 'Record created successfully!'
                    : 'No record created!',
                data: newUser,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async loginUser(user) {
        try {
            const { email, password } = user;
            if (!email || !password) {
                throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.UNAUTHORIZED);
            }
            const foundUser = await this.prismaService.users.findUnique({
                where: { email },
            });
            if (!foundUser) {
                throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
            }
            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatch) {
                throw new common_1.HttpException('Invalid email or password', common_1.HttpStatus.UNAUTHORIZED);
            }
            const token = this.jwtService.sign({ user: foundUser }, { secret: this.configService.get('jwt_secret') });
            delete foundUser.password;
            return { isValid: true, message: 'success', user: foundUser, token };
        }
        catch (err) {
            throw new common_1.HttpException({
                status: err.status,
                message: err.message || 'Internal server error',
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async forgotPassword(email) {
        var _a, _b;
        try {
            const user = await this.prismaService.users.findUnique({
                where: {
                    email,
                },
            });
            if (!user) {
                throw new common_1.HttpException({
                    status: 'failed',
                    message: 'User not found!',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            return {
                status: 'success',
                message: 'User found',
                isValid: true,
                user,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, body) {
        var _a, _b;
        try {
            const updated_at = new Date().toISOString();
            const updateUser = await this.prismaService.users.update({
                where: {
                    id,
                },
                data: Object.assign(Object.assign({}, body), { status: body.status ? true : false, updated_at }),
            });
            delete updateUser.password;
            return {
                status: updateUser ? 'success' : 'failed',
                message: updateUser
                    ? 'Record updated successfully!'
                    : 'No record updated!',
                data: updateUser,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id) {
        var _a, _b;
        try {
            const deleteUser = await this.prismaService.users.delete({
                where: {
                    id,
                },
            });
            if (!deleteUser) {
                throw new common_1.HttpException({ status: 'failed', message: 'Not deleted!' }, common_1.HttpStatus.NOT_IMPLEMENTED);
            }
            return {
                status: 'success',
                message: 'Record deleted successfully!',
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUserPassword(data) {
        var _a, _b;
        try {
            const user = await this.prismaService.users.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const saltOrRounds = 10;
            const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
            user.password = await hashPassword;
            if (!hashPassword) {
                throw new common_1.HttpException({
                    status: 'failed',
                    message: 'Password not changed!',
                    isChanged: false,
                }, common_1.HttpStatus.NOT_IMPLEMENTED);
            }
            return {
                status: 'success',
                message: 'Password changed successfully!',
                isChanged: true,
            };
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeUserPassword(id, body) {
        var _a, _b;
        try {
            const saltOrRounds = 10;
            const salt = await bcrypt.genSalt(saltOrRounds);
            const hashPassword = await bcrypt.hash(body.password, salt);
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
        }
        catch (err) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: ((_a = err === null || err === void 0 ? void 0 : err.meta) === null || _a === void 0 ? void 0 : _a.target) || ((_b = err === null || err === void 0 ? void 0 : err.meta) === null || _b === void 0 ? void 0 : _b.cause) || 'Internal server error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map