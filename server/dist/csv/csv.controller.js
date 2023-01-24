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
exports.CsvController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const csv_service_1 = require("./csv.service");
let CsvController = class CsvController {
    constructor(csvService) {
        this.csvService = csvService;
    }
    async uploadFile(files) {
        const dates = await this.csvService.parseCsv(files.dates[0], true);
        const matrix = await this.csvService.parseCsv(files.matrix[0], false);
        return { dates, matrix: matrix };
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'matrix', maxCount: 1 },
        { name: 'dates', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CsvController.prototype, "uploadFile", null);
CsvController = __decorate([
    (0, common_1.Controller)('csv'),
    __metadata("design:paramtypes", [csv_service_1.CsvService])
], CsvController);
exports.CsvController = CsvController;
//# sourceMappingURL=csv.controller.js.map