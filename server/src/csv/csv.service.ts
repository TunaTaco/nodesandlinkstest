import {Injectable} from '@nestjs/common';
import * as csv from 'fast-csv';

import fs from 'fs';
import Papa from 'papaparse';
import {Readable} from "stream";

@Injectable()
export class CsvService {
  async parseCsv(file, headers) {
    const csvData = []

    const stream = Readable.from(file.buffer);
    const readFile = new Promise((resolve, reject) => {
      stream.pipe(csv.parse({headers}))
        .on('error', error => console.error(error))
        .on('data', row => {
          console.log(row)
          csvData.push(row)
        })
        .on('end', (rowCount: number) => {
          console.log(`Parsed ${rowCount} rows`)
          resolve(csvData)
        });
    })


    return await readFile;
  }
}



