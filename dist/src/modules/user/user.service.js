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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const utils_service_1 = require("../../utils/utils.service");
const bcrypt = require("bcrypt");
let UserService = UserService_1 = class UserService {
    constructor(prisma, utilsService) {
        this.prisma = prisma;
        this.utilsService = utilsService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    upsert(userCreateInput, movie) {
        if (movie) {
            userCreateInput.Movie = {
                connectOrCreate: {
                    create: movie,
                    where: { id: movie.id },
                },
            };
        }
        return this.prisma.user.upsert({
            where: { email: userCreateInput.email },
            create: userCreateInput,
            update: userCreateInput,
        });
    }
    findUser(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    findUserByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async findUserByConfirmationToken(confirmationToken) {
        return this.prisma.user.findFirst({
            where: { confirmationToken },
        });
    }
    async findUserByRecoveryToken(recoveryToken) {
        return this.prisma.user.findFirst({
            where: { recoveryToken },
        });
    }
    async addRole(userRolesBulkInput) {
        const messages = [];
        await this.utilsService.forEachAsync(userRolesBulkInput.users, async ({ id, roles }) => {
            try {
                const user = await this.prisma.user.findUnique({
                    where: { id },
                    select: {
                        roles: true,
                        username: true,
                    },
                });
                await this.prisma.user.update({
                    where: { id },
                    data: {
                        roles: {
                            push: roles.filter((role) => !user.roles.includes(role)),
                        },
                    },
                });
                messages.push({
                    message: `Roles do usuário ${user.username} atualizadas com sucesso`,
                    success: true,
                });
            }
            catch (error) {
                this.logger.error(error);
                messages.push({
                    message: `Erro ao atualizar role: ${error}`,
                    success: false,
                });
            }
        });
        return messages;
    }
    async removeRole(userRolesBulkInput) {
        const messages = [];
        await this.utilsService.forEachAsync(userRolesBulkInput.users, async ({ id, roles }) => {
            try {
                const user = await this.prisma.user.findUnique({
                    where: { id },
                    select: {
                        roles: true,
                        username: true,
                    },
                });
                await this.prisma.user.update({
                    where: { id },
                    data: {
                        roles: {
                            set: user.roles.filter((role) => !roles.includes(role)),
                        },
                    },
                });
                messages.push({
                    message: `Roles do usuário ${user.username} atualizadas com sucesso`,
                    success: true,
                });
            }
            catch (error) {
                this.logger.error(error);
                messages.push({
                    message: `Erro ao atualizar role: ${error}`,
                    success: false,
                });
            }
        });
        return messages;
    }
    async createUser(userCreateInput) {
        const salt = await bcrypt.genSalt();
        userCreateInput.password = await bcrypt.hash(userCreateInput.password, salt);
        return await this.upsert(userCreateInput);
    }
    async changePassword(user) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return await this.upsert(user);
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        utils_service_1.UtilsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map