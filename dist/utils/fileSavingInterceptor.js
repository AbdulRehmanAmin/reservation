"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSavingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
let FileSavingInterceptor = class FileSavingInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const body = request.body;
        const file = request.file;
        if (file) {
            const path = `uploadss/${file.originalname}`;
            const writeStream = (0, fs_1.createWriteStream)(path);
            response.on('finish', () => {
                console.log(`File saved to ${path}`);
            });
            file.stream.pipe(writeStream);
        }
        return next.handle();
    }
};
FileSavingInterceptor = __decorate([
    (0, common_1.Injectable)()
], FileSavingInterceptor);
exports.FileSavingInterceptor = FileSavingInterceptor;
//# sourceMappingURL=fileSavingInterceptor.js.map