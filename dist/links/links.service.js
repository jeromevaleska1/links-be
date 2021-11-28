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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const pg_service_1 = require("../pg/pg.service");
let LinksService = class LinksService {
    constructor(pg, config) {
        this.pg = pg;
        this.config = config;
    }
    async getLink({ sessionId, longUrl, views }) {
        const BASE_URL = this.config.get('baseUrl');
        const shortUrl = `${BASE_URL}/${crypto.randomBytes(20).toString('hex').substr(0, 5)}`;
        await this.pg.save({ sessionId, views, longUrl, shortUrl });
        return shortUrl;
    }
    async getUserData(sessionId) {
        return this.pg.getUrls(sessionId);
    }
};
LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pg_service_1.PgService, config_1.ConfigService])
], LinksService);
exports.LinksService = LinksService;
//# sourceMappingURL=links.service.js.map