"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('port');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors({
        allowedHeaders: '*',
        origin: '*',
        credentials: true,
        methods: '*',
        preflightContinue: false
    });
    await app.listen(PORT, () => {
        console.log(`Server running at: ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map