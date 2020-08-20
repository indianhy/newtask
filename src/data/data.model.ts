import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
});

export interface Data extends mongoose.Document {
  id: string;
  name: string;
  address: string;
  age: number;
}