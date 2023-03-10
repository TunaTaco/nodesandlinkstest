import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CsvModule} from './csv/csv.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    CsvModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
