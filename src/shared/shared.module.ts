import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataSchema, Data, BookSchema, Book, Login,Payload } from './data.model'
import { DataService } from './data.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Data', schema: DataSchema }])
    ],
    providers:[DataService],
    exports:[
        DataService
    ] 
})
export class SharedModule{}