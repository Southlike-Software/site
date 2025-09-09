import { MongoClient } from "mongodb";

type Cached = { client: MongoClient | null; promise: Promise<MongoClient> | null };

const globalForMongo = globalThis as unknown as { _mongo?: Cached };

const uri = import.meta.env.MONGODB_URI as string | undefined;

if (!uri) {
    console.warn("[mongo] Missing MONGODB_URI. API routes depending on MongoDB will fail.");
}

let cached: Cached = globalForMongo._mongo ?? { client: null, promise: null };

export async function getMongoClient(): Promise<MongoClient> {
    if (!uri) throw new Error("MONGODB_URI is not set");
    if (cached.client) return cached.client;
    if (!cached.promise) {
        cached.promise = new MongoClient(uri, {
            // modern driver defaults are good; keep options explicit for clarity
        }).connect();
    }
    cached.client = await cached.promise;
    globalForMongo._mongo = cached;
    return cached.client;
}

export async function getDb(dbName?: string) {
    const client = await getMongoClient();
    return client.db(dbName || process.env.MONGODB_DB || "southlike");
}


