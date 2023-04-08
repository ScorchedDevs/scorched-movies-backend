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
var TorrentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorrentService = void 0;
const common_1 = require("@nestjs/common");
const torrentStream = require("torrent-stream");
const movies_service_1 = require("../movies/movies.service");
const gateway_service_1 = require("../gateway/gateway.service");
const message_type_1 = require("../gateway/dto/message.type");
const subsdownloader_service_1 = require("../subsdownloader/subsdownloader.service");
const plex_service_1 = require("../plex/plex.service");
let TorrentService = TorrentService_1 = class TorrentService {
    constructor(moviesService, gatewayService, subsdownloaderService, plexService) {
        this.moviesService = moviesService;
        this.gatewayService = gatewayService;
        this.subsdownloaderService = subsdownloaderService;
        this.plexService = plexService;
        this.logger = new common_1.Logger(TorrentService_1.name);
    }
    async donwloadTorrent(downloadTorrentInput, user) {
        const options = { path: `torrents/movies`, verify: true, dht: true };
        const engine = await torrentStream(downloadTorrentInput.magnetLink, options);
        let movie = await this.moviesService.findMovie(downloadTorrentInput);
        if (!movie) {
            const movieCreateInput = {
                name: downloadTorrentInput.name,
                quality: downloadTorrentInput.quality,
                image: downloadTorrentInput.image,
            };
            movie = await this.moviesService.create(movieCreateInput);
        }
        movie = await this.moviesService.updateMovieUsers(movie, user);
        this.gatewayService.server.emit('message', {
            id: movie.id,
            type: message_type_1.MessageType.DOWNLOAD_ADDED,
            content: { message: 'Movie was added to the queue' },
        });
        engine.on('ready', async () => {
            this.gatewayService.server.emit('message', {
                id: movie.id,
                type: message_type_1.MessageType.DOWNLOAD_STARTED,
                content: { message: 'Movie started downloading' },
            });
            for (const file of engine.files) {
                const stream = file.createReadStream();
                this.subsdownloaderService.getSubs(downloadTorrentInput.imdbId, `torrents/movies/${file.path.split('/')[0]}`);
                movie.dir = `torrents/movies/${file.path.split('/')[0]}`;
                movie.finishedDownloadingAt = null;
                movie.deletedAt = null;
                movie = await this.moviesService.updateMovie(movie);
            }
        });
        engine.on('download', () => {
            const totalLength = engine.files
                .map((file) => file.length)
                .reduce(function (sum, value) {
                return sum + value;
            });
            const swarm = engine.swarm;
            this.gatewayService.server.emit('message', {
                id: movie.id,
                type: message_type_1.MessageType.DOWNLOAD_PROGRESS,
                content: {
                    downloadedAmount: (engine.swarm.downloaded / totalLength) * 100,
                    downloadSpeed: swarm.downloadSpeed(),
                },
            });
        });
        engine.on('idle', () => {
            movie.finishedDownloadingAt = new Date();
            this.moviesService.updateMovie(movie);
            this.gatewayService.server.emit('message', {
                id: movie.id,
                type: message_type_1.MessageType.DOWNLOAD_FINISHED,
                content: {
                    message: 'Movie finished downloading',
                },
            });
            this.plexService.scanLibraries();
        });
        return { message: `O torrent foi baixado`, success: true };
    }
};
TorrentService = TorrentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        gateway_service_1.GatewayService,
        subsdownloader_service_1.SubsdownloaderService,
        plex_service_1.PlexService])
], TorrentService);
exports.TorrentService = TorrentService;
//# sourceMappingURL=torrent.service.js.map