"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = {
        origin: 'http://localhost:3000',
    };
    app.enableCors(options);
    await app.listen(PORT, () => {
        console.log(`Sever started on ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map