"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
var Environment;
(function (Environment) {
    Environment["DEVELOPMENT"] = "DEVELOPMENT";
    Environment["PRODUCTION"] = "PRODUCTION";
})(Environment || (Environment = {}));
exports.validationSchema = Joi.object({
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
});
//# sourceMappingURL=environment.js.map