"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorrentModule = void 0;
const common_1 = require("@nestjs/common");
const torrent_service_1 = require("./torrent.service");
const torrent_controller_1 = require("./torrent.controller");
const utils_module_1 = require("../../utils/utils.module");
const movies_module_1 = require("../movies/movies.module");
const gateway_module_1 = require("../gateway/gateway.module");
const user_module_1 = require("../user/user.module");
const subsdownloader_module_1 = require("../subsdownloader/subsdownloader.module");
const plex_module_1 = require("../plex/plex.module");
let TorrentModule = class TorrentModule {
};
TorrentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            utils_module_1.UtilsModule,
            movies_module_1.MoviesModule,
            gateway_module_1.GatewayModule,
            user_module_1.UserModule,
            subsdownloader_module_1.SubsdownloaderModule,
            plex_module_1.PlexModule,
        ],
        providers: [torrent_service_1.TorrentService],
        controllers: [torrent_controller_1.TorrentController],
    })
], TorrentModule);
exports.TorrentModule = TorrentModule;
//# sourceMappingURL=torrent.module.js.map