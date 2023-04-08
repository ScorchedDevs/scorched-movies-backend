"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const torrent_module_1 = require("./torrent/torrent.module");
const yts_module_1 = require("./yts/yts.module");
const movies_module_1 = require("./movies/movies.module");
const gateway_module_1 = require("./gateway/gateway.module");
const subsdownloader_module_1 = require("./subsdownloader/subsdownloader.module");
const cleanup_module_1 = require("./cleanup/cleanup.module");
const plex_module_1 = require("./plex/plex.module");
let ModulesModule = class ModulesModule {
};
ModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            torrent_module_1.TorrentModule,
            yts_module_1.YtsModule,
            movies_module_1.MoviesModule,
            gateway_module_1.GatewayModule,
            subsdownloader_module_1.SubsdownloaderModule,
            cleanup_module_1.CleanupModule,
            plex_module_1.PlexModule,
        ],
    })
], ModulesModule);
exports.ModulesModule = ModulesModule;
//# sourceMappingURL=modules.module.js.map