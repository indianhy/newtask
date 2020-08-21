import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
  });


  export const DataSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    books: { type: [BookSchema] }
  });

  export interface Book extends mongoose.Document {
    title: string;
    genre: string;
  }
  
  export interface Data extends mongoose.Document {
    id: string;
    username:string
    password:string
    name: string;
    address: string;
    age: number;
    books: Book[]
  }

  export interface Login {
    username : string
    password : string
  }

  export interface Payload {
    username: string;
    iat?: number;
    expiresIn?: string;
  }