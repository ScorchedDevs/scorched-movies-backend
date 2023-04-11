import * as Joi from 'joi';

enum Environment {
  DEVELOPMENT = 'DEVELOPMENT',
  PRODUCTION = 'PRODUCTION',
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
  MOVIES_PATH: string;
  TRANSMISSION_USER: string;
  TRANSMISSION_PASS: string;
  TRANSMISSION_PATH: string;
}

export const validationSchema = Joi.object<EnvironmentVariables>({
  NODE_ENV: Joi.string()
    .valid(Environment.DEVELOPMENT, Environment.PRODUCTION)
    .default(Environment.DEVELOPMENT),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string()
    .default('postgresql://postgres:postgres@localhost:5432/scorched-movies')
    .when('NODE_ENV', { is: Environment.PRODUCTION, then: Joi.required() }),
  JWT_SECRET: Joi.string()
    .default('SECRET')
    .when('NODE_ENV', { is: Environment.PRODUCTION, then: Joi.required() }),
  JWT_EXPIRATION_TIME: Joi.number().default(36000000),
  ADMIN_PASSWORD: Joi.string()
    .default('admin')
    .when('NODE_ENV', { is: Environment.PRODUCTION, then: Joi.required() }),
  FRONTEND_URL: Joi.string().default('http://localhost:4200'),
  SCORCHED_MOVIES_MAIL: Joi.string().required(),
  SCORCHED_MOVIES_MAIL_PASSWORD: Joi.string().required(),
  OPENSUBS_API_KEY: Joi.string().required(),
  OPENSUBS_LOGIN: Joi.string().required(),
  OPENSUBS_PASSWORD: Joi.string().required(),
  PLEX_URL: Joi.string().required(),
  PLEX_TOKEN: Joi.string().required(),
  MOVIES_PATH: Joi.string().default('movies'),
  TRANSMISSION_USER: Joi.string().default('admin'),
  TRANSMISSION_PASS: Joi.string().default('admin'),
  TRANSMISSION_PATH: Joi.string.default('/output'),
});
