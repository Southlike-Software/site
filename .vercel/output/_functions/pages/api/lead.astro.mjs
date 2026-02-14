import { z } from 'zod';
import { MongoClient } from 'mongodb';
export { renderers } from '../../renderers.mjs';

const globalForMongo = globalThis;
const uri = "mongodb+srv://marcusfilipus:zuQvLMPeCqWJsukC@test.vfyxvvl.mongodb.net/?retryWrites=true&w=majority&appName=test";
let cached = globalForMongo._mongo ?? { client: null, promise: null };
async function getMongoClient() {
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
async function getDb(dbName) {
  const client = await getMongoClient();
  return client.db(process.env.MONGODB_DB || "southlike");
}

const prerender = false;
const LeadSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  phone: z.string().min(6),
  leadVolume: z.string().min(1),
  avgResponseTime: z.string().min(1),
  email: z.string().email().optional(),
  // allow relative path like "/obrigado" as well as absolute URLs
  redirect: z.string().optional()
});
const POST = async ({ request, redirect }) => {
  try {
    const form = await request.formData();
    const data = Object.fromEntries(form.entries());
    const parsed = LeadSchema.safeParse(data);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), { status: 400 });
    }
    const db = await getDb();
    const collection = db.collection("leads");
    const now = /* @__PURE__ */ new Date();
    await collection.insertOne({
      ...parsed.data,
      createdAt: now,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
      ip: request.headers.get("x-forwarded-for") || void 0,
      source: "website"
    });
    const url = parsed.data.redirect || "/obrigado";
    return redirect(url, 302);
  } catch (err) {
    console.error("/api/lead error", err);
    return new Response(JSON.stringify({ error: "Erro interno" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
