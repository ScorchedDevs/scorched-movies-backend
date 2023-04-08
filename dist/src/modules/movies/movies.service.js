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
var MoviesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
const user_service_1 = require("../user/user.service");
let MoviesService = MoviesService_1 = class MoviesService {
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
        this.logger = new common_1.Logger(MoviesService_1.name);
    }
    async create(movieCreateInput) {
        return this.prismaService.movie.create({
            data: movieCreateInput,
        });
    }
    async updateMovie(movie) {
        return this.prismaService.movie.update({
            where: { id: movie.id },
            data: movie,
        });
    }
    async findUserMovies(user) {
        return this.prismaService.movie.findMany({
            where: {
                AND: [{ users: { some: { id: user.id } } }, { deletedAt: null }],
            },
        });
    }
    async findMovie({ name, quality }) {
        return this.prismaService.movie.findFirst({
            where: { name, quality },
        });
    }
    async updateMovieUsers(movie, user) {
        return this.prismaService.movie.update({
            where: { id: movie.id },
            data: {
                users: {
                    connect: [{ id: user.id }],
                },
            },
        });
    }
};
MoviesService = MoviesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        user_service_1.UserService])
], MoviesService);
exports.MoviesService = MoviesService;
//# sourceMappingURL=movies.service.js.map