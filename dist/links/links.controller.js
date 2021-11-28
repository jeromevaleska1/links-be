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
exports.LinksController = exports.GetLinkDTO = void 0;
const common_1 = require("@nestjs/common");
const links_service_1 = require("./links.service");
class GetLinkDTO {
}
exports.GetLinkDTO = GetLinkDTO;
let LinksController = class LinksController {
    constructor(linksService) {
        this.linksService = linksService;
    }
    async getLink(body, req, session) {
        session.views = (session.views || 0) + 1;
        const { sessionID } = req;
        const link = await this.linksService.getLink({ sessionId: sessionID, views: session.views, longUrl: body.url });
        console.log({ sessionID, link });
        return { link, views: session.views };
    }
    async getUserData(req) {
        const { sessionID } = req;
        console.log({ sessionID });
        const res = await this.linksService.getUserData(sessionID);
        console.log(res);
        return res;
    }
};
__decorate([
    (0, common_1.Post)('link'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetLinkDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getLink", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinksController.prototype, "getUserData", null);
LinksController = __decorate([
    (0, common_1.Controller)('links'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
exports.LinksController = LinksController;
//# sourceMappingURL=links.controller.js.map