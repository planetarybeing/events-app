import { MONGO_CLIENT_EVENTS } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached =  mongoose || { conn: null, promise: null };

export const connectedToDtabase = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
        dbName: 'tappn',
        bufferCommands: false,
    })

    cached.conn = await cached.promise;
}
