import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema } from './data.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }]),
    AuthModule
  ],
  controllers: [DataController],
  providers: [DataService]
})
export class DataModule {}
