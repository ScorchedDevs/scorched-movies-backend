import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { PrismaConfigService } from './config/prisma/prisma-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/environment';
import { PrismaModule } from 'nestjs-prisma';
import { LoggerMiddleWare } from './middlewares/logger.middleware';
import { UtilsModule } from './utils/utils.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
      cache: true,
      validationOptions: {
        abortEarly: true,
      },
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        template: {
          dir: path.resolve(
            __dirname,
            '..',
            '..',
            'src',
            'config',
            'mail-templates',
          ),
          adapter: new HandlebarsAdapter(),
          options: {
            extName: '.hbs',
            layoutsDir: path.resolve(
              __dirname,
              '..',
              '..',
              'src',
              'config',
              'mail-templates',
            ),
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
    ModulesModule,
    UtilsModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleWare).forRoutes('*');
  }
}
