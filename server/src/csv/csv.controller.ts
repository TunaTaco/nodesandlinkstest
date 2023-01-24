import {Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileFieldsInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {CsvService} from "./csv.service";

@Controller('csv')
export class CsvController {

  constructor(private readonly csvService: CsvService) {
  }

  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'matrix', maxCount: 1},
    {name: 'dates', maxCount: 1},
  ]))
  async uploadFile(@UploadedFiles() files: { matrix?: Express.Multer.File[], dates?: Express.Multer.File[] }) {
    const dates = await this.csvService.parseCsv(files.dates[0], true);
    const matrix = await this.csvService.parseCsv(files.matrix[0], false);

    return {dates, matrix: matrix}
  }
}
