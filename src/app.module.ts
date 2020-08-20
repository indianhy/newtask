import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DataModule } from './data/data.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hymanshu:zqW6z1zIudKosdp3@cluster0.aeeej.mongodb.net/graphqldb?retryWrites=true&w=majority',
    ),
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
