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
var CleanupService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanupService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const fs_1 = require("fs");
const nestjs_prisma_1 = require("nestjs-prisma");
const movies_service_1 = require("../movies/movies.service");
let CleanupService = CleanupService_1 = class CleanupService {
    constructor(prismService, moviesService) {
        this.prismService = prismService;
        this.moviesService = moviesService;
        this.logger = new common_1.Logger(CleanupService_1.name);
        this.subtractDays = (date, days) => {
            date.setDate(date.getDate() - days);
            return date;
        };
    }
    async deleteMovies() {
        const movies = await this.prismService.movie.findMany({
            where: {
                AND: [
                    {
                        finishedDownloadingAt: {
                            lte: this.subtractDays(new Date(), 7),
                        },
                    },
                    {
                        deletedAt: null,
                    },
                ],
            },
        });
        for (const movie of movies) {
            this.logger.log(`Deleting movie ${movie.name}`);
            (0, fs_1.rmSync)(movie.dir, { recursive: true, force: true });
            movie.dir = null;
            movie.deletedAt = new Date();
            this.moviesService.updateMovie(movie);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CleanupService.prototype, "deleteMovies", null);
CleanupService = CleanupService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService,
        movies_service_1.MoviesService])
], CleanupService);
exports.CleanupService = CleanupService;
//# sourceMappingURL=cleanup.service.js.map