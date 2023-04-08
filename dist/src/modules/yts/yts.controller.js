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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YtsController = void 0;
const common_1 = require("@nestjs/common");
const yts_service_1 = require("./yts.service");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let YtsController = class YtsController {
    constructor(ytsService) {
        this.ytsService = ytsService;
    }
    lstMovies({ limit, page, searchQuery }) {
        return this.ytsService.getMovies(limit, page, searchQuery);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.USER, client_1.Role.ADMIN, client_1.Role.DOWNLOADER),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], YtsController.prototype, "lstMovies", null);
YtsController = __decorate([
    (0, common_1.Controller)('yts'),
    __metadata("design:paramtypes", [yts_service_1.YtsService])
], YtsController);
exports.YtsController = YtsController;
//# sourceMappingURL=yts.controller.js.map