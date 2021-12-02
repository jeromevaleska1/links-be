"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const links_controller_1 = require("./links/links.controller");
const links_service_1 = require("./links/links.service");
const nestjs_session_1 = require("nestjs-session");
const config_1 = require("@nestjs/config");
const config_2 = require("./config/config");
const pg_service_1 = require("./pg/pg.service");
const url_service_1 = require("./url/url.service");
let cookie = {};
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    cookie = {
        sameSite: 'none',
        secure: true
    };
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.config],
            }),
            nestjs_session_1.SessionModule.forRoot({
                session: { secret: 'keyboard cat', cookie, proxy: true },
            }),
        ],
        controllers: [
            links_controller_1.LinksController
        ],
        providers: [links_service_1.LinksService, pg_service_1.PgService, pg_service_1.PgService, url_service_1.UrlService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map