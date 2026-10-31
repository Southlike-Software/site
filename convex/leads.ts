import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

// Public mutation guarded by a shared secret so only the site's API route can insert.
export const create = mutation({
    args: {
        secret: v.string(),
        name: v.string(),
        company: v.string(),
        phone: v.string(),
        leadVolume: v.string(),
        avgResponseTime: v.string(),
        email: v.optional(v.string()),
        userAgent: v.optional(v.string()),
        referer: v.optional(v.string()),
        ip: v.optional(v.string()),
    },
    handler: async (ctx, { secret, ...lead }) => {
        const expected = process.env.LEADS_INGEST_SECRET;
        if (!expected || secret !== expected) throw new ConvexError("unauthorized");
        return await ctx.db.insert("leads", { ...lead, source: "website" });
    },
});
