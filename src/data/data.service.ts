import { Injectable, NotFoundException } from '@nestjs/common';
import { Data } from './data.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class DataService {

    constructor(
        @InjectModel('Data') private readonly dataModel: Model<Data>,
      ) {}

      async addData(name: string, address: string, age: number) {
        const newData = new this.dataModel({
          name,
          address,
          age,
        });
        const result = await newData.save();
        return result.id as string;
      }

      async getAllData() {
        const data = await this.dataModel.find();
        return data as Data[];    
    }
    
      async getSingleData(dataId: string) {
        const d = await this.findData(dataId);
        return {
            id: d.id,
            name: d.name,
            address: d.address,
            age: d.age,        
        };
      }
    
      async updateData(
        dataId: string,
        name: string,
        address: string,
        age: number,
      ) {
        const updatedData = await this.findData(dataId);
        if (name) {
          updatedData.name = name;
        }
        if (address) {
          updatedData.address = address;
        }
        if (age) {
          updatedData.age = age;
        }
        updatedData.save();
      }
    
      async deleteData(id: string) {
        const result = await this.dataModel.deleteOne({_id: id});
        if (result.n === 0) {
          throw new NotFoundException('Could not find such data.');
        }
      }
    
      private async findData(id: string): Promise<Model<Data>> {
        let data;
        try {
          data = await this.dataModel.findById(id);
        } catch (error) {
          throw new NotFoundException('Could not find data.');
        }
        if (!data) {
          throw new NotFoundException('Could not find data.');
        }
        return data;
      }
    

}
