"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const modules_module_1 = require("./modules/modules.module");
const prisma_config_service_1 = require("./config/prisma/prisma-config.service");
const config_1 = require("@nestjs/config");
const environment_1 = require("./config/environment");
const nestjs_prisma_1 = require("nestjs-prisma");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const utils_module_1 = require("./utils/utils.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const path = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleWare).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: environment_1.validationSchema,
                cache: true,
                validationOptions: {
                    abortEarly: true,
                },
            }),
            nestjs_prisma_1.PrismaModule.forRootAsync({
                isGlobal: true,
                useClass: prisma_config_service_1.PrismaConfigService,
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    template: {
                        dir: path.resolve(__dirname, '..', '..', 'src', 'config', 'mail-templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            extName: '.hbs',
                            layoutsDir: path.resolve(__dirname, '..', '..', 'src', 'config', 'mail-templates'),
                        },
                    },
                    transport: {
                        service: 'gmail',
                        auth: {
                            user: configService.get('SCORCHED_MOVIES_MAIL'),
                            pass: configService.get('SCORCHED_MOVIES_MAIL_PASSWORD'),
                        },
                    },
                }),
            }),
            modules_module_1.ModulesModule,
            utils_module_1.UtilsModule,
            auth_module_1.AuthModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map