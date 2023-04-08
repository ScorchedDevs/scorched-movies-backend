import { Injectable } from '@nestjs/common';
import {
  PrismaOptionsFactory,
  PrismaServiceOptions,
  loggingMiddleware,
} from 'nestjs-prisma';

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      middlewares: [loggingMiddleware()],
    };
  }
}
