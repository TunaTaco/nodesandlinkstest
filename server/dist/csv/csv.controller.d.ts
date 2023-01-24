/// <reference types="multer" />
import { CsvService } from "./csv.service";
export declare class CsvController {
    private readonly csvService;
    constructor(csvService: CsvService);
    uploadFile(files: {
        matrix?: Express.Multer.File[];
        dates?: Express.Multer.File[];
    }): Promise<{
        dates: unknown;
        matrix: unknown;
    }>;
}
