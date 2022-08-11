import { MongoClient } from 'mongodb';
import { config } from '../config.js';

export async function connectDB() {
  return MongoClient.connect(config.db.host) //
    .then((client) => client.db());
}
