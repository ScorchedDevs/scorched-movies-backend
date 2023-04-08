import { PrismaOptionsFactory, PrismaServiceOptions } from 'nestjs-prisma';
export declare class PrismaConfigService implements PrismaOptionsFactory {
    createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions>;
}
