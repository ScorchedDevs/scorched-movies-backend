"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YtsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YtsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let YtsService = YtsService_1 = class YtsService {
    constructor() {
        this.logger = new common_1.Logger(YtsService_1.name);
    }
    async getMovies(limit, page, search = null) {
        let searchQuery = '';
        if (search) {
            searchQuery = `&query_term=${search}`;
        }
        const { data } = await axios_1.default
            .get(`http://yts.torrentbay.to/api/v2/list_movies.json?limit=${limit}&page=${page}${searchQuery}`)
            .catch((e) => {
            throw new Error(e);
        });
        return data;
    }
};
YtsService = YtsService_1 = __decorate([
    (0, common_1.Injectable)()
], YtsService);
exports.YtsService = YtsService;
//# sourceMappingURL=yts.service.js.map