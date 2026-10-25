import { ConvexHttpClient } from "convex/browser";

const url = import.meta.env.CONVEX_URL as string | undefined;

if (!url) {
    console.warn("[convex] Missing CONVEX_URL. API routes depending on Convex will fail.");
}

let client: ConvexHttpClient | null = null;

// Stateless HTTP client: no long-lived connection to go stale between invocations.
export function getConvex(): ConvexHttpClient {
    if (!url) throw new Error("CONVEX_URL is not set");
    client ??= new ConvexHttpClient(url);
    return client;
}
