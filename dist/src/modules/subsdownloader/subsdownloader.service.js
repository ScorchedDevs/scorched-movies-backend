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
var SubsdownloaderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubsdownloaderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const fs_1 = require("fs");
const https = require("https");
let SubsdownloaderService = SubsdownloaderService_1 = class SubsdownloaderService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(SubsdownloaderService_1.name);
    }
    async getSubs(imdbId, directory) {
        try {
            const loginBody = {
                username: this.configService.get('OPENSUBS_LOGIN'),
                password: this.configService.get('OPENSUBS_PASSWORD'),
            };
            const { data } = await axios_1.default
                .post('https://api.opensubtitles.com/api/v1/login', loginBody, {
                headers: {
                    'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
                },
            })
                .catch((e) => {
                throw new Error(e);
            });
            this.token = data.token;
        }
        catch (error) {
            this.logger.error(error);
        }
        await this.delay(5000);
        try {
            const { data } = await axios_1.default
                .get(`https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbId}&languages=pt-br,en`, {
                headers: {
                    'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
                },
            })
                .catch((e) => {
                throw new Error(e);
            });
            await this.delay(5000);
            for (const sub of data.data) {
                const queryData = {
                    file_id: sub.attributes.files[0].file_id,
                };
                try {
                    const { data } = await axios_1.default
                        .post(`https://api.opensubtitles.com/api/v1/download`, queryData, {
                        headers: {
                            'Api-Key': this.configService.get('OPENSUBS_API_KEY'),
                            'Content-Type': 'application/json; charset=utf-8',
                            Authorization: `Bearer ${this.token}`,
                            Accept: '*/*',
                        },
                    })
                        .catch((e) => {
                        throw new Error(e);
                    });
                    https.get(data.link, (res) => {
                        const path = `${directory}/${data.file_name}`;
                        const filePath = (0, fs_1.createWriteStream)(path);
                        res.pipe(filePath);
                        filePath.on('finish', () => {
                            filePath.close();
                        });
                    });
                }
                catch (error) {
                    this.logger.error(error);
                }
                await this.delay(5000);
            }
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
SubsdownloaderService = SubsdownloaderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SubsdownloaderService);
exports.SubsdownloaderService = SubsdownloaderService;
//# sourceMappingURL=subsdownloader.service.js.map