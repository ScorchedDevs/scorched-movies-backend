import * as Joi from 'joi';
declare enum Environment {
    DEVELOPMENT = "DEVELOPMENT",
    PRODUCTION = "PRODUCTION"
}
interface EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: number;
    ADMIN_PASSWORD: string;
    FRONTEND_URL: string;
    SCORCHED_MOVIES_MAIL: string;
    SCORCHED_MOVIES_MAIL_PASSWORD: string;
    OPENSUBS_API_KEY: string;
    OPENSUBS_LOGIN: string;
    OPENSUBS_PASSWORD: string;
    PLEX_URL: string;
    PLEX_TOKEN: string;
}
export declare const validationSchema: Joi.ObjectSchema<EnvironmentVariables>;
export {};
