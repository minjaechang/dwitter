import mongoose from 'mongoose';
import { config } from '../config.js';

let db;
export async function connectDB() {
  return mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  // _id -> id (컬렉션에는 포함되지 않음)
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true }); // json으로 변환될 때 id 또한 포함되도록!
  schema.set('toObject', { virtuals: true }); // object로 변환될 때도 id 포함
}

// TODO(minjae): Delete the codes below
export function getTweets() {
  return db.collection('tweets');
}
