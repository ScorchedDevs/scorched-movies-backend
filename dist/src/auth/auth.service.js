"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../modules/user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(userService, jwtService, configService, mailerService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async validateLocalUser(username, password) {
        const user = await this.userService.findUser(username);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                delete user.password;
                return user;
            }
        }
        return null;
    }
    login(user) {
        const payload = { id: user.id, username: user.username, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signUp(user) {
        user = await this.userService.createUser(user);
        const mail = {
            to: user.email,
            from: 'noreply@scorchedmovies.com',
            subject: 'Confirmation Email',
            template: 'email-confirmation',
            context: {
                token: user.confirmationToken,
                frontendUrl: this.configService.get('FRONTEND_URL'),
            },
        };
        await this.mailerService.sendMail(mail);
        return {
            message: 'Successfully signed up. Please confirm your e-mail.',
            success: true,
        };
    }
    async confirmEmail(confirmationToken) {
        const user = await this.userService.findUserByConfirmationToken(confirmationToken);
        if (user) {
            user.confirmationToken = null;
            await this.userService.upsert(user);
            return {
                message: 'Email has been confirmed. Try to login now.',
                success: true,
            };
        }
        else {
            throw new common_1.UnprocessableEntityException('Invalid Token');
        }
    }
    async sendRecoverPasswordMail(email) {
        let user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('There is no user associated with this e-mail adress');
        }
        user.recoveryToken = (0, crypto_1.randomBytes)(32).toString('hex');
        user = await this.userService.upsert(user);
        const mail = {
            to: user.email,
            from: 'noreply@scorchedmovies.com',
            subject: 'Password Recovery',
            template: 'password-recovery',
            context: {
                frontendUrl: this.configService.get('FRONTEND_URL'),
                token: user.recoveryToken,
            },
        };
        await this.mailerService.sendMail(mail);
        return { message: 'A recovery e-mail has been sent.', success: true };
    }
    async recoverPassword(recoverPasswordInput) {
        let user = await this.userService.findUserByRecoveryToken(recoverPasswordInput.recoveryToken);
        if (user) {
            user.password = recoverPasswordInput.password;
            user.recoveryToken = null;
            user = await this.userService.changePassword(user);
            return {
                message: 'Password has been changed. Try to login now',
                success: true,
            };
        }
        else {
            throw new common_1.UnprocessableEntityException('Invalid Token');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map