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
exports.PgService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const insertText = 'INSERT INTO urls(session, views, url, shortUrl) VALUES ($1, $2, $3, $4)';
const selectText = 'select session, views, url, shortUrl from urls where session = $1';
let PgService = class PgService {
    constructor(config) {
        this.config = config;
        this.client = this.config.get('pgClient');
    }
    async save({ sessionId, longUrl, shortUrl, views }) {
        return this.client.query(insertText, [sessionId, views, longUrl, shortUrl]);
    }
    async getUrls(sessionId) {
        const { rows } = await this.client.query(selectText, [sessionId]);
        return rows;
    }
};
PgService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PgService);
exports.PgService = PgService;
//# sourceMappingURL=pg.service.js.map