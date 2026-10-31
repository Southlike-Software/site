import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// Discord bot (Aria) reads unposted leads via a live subscription, then marks them posted.
const assertBot = (secret: string) => {
    const expected = process.env.DISCORD_BOT_SECRET;
    if (!expected || secret !== expected) throw new ConvexError("unauthorized");
};

export const unnotified = query({
    args: { secret: v.string() },
    handler: async (ctx, { secret }) => {
        assertBot(secret);
        return await ctx.db
            .query("leads")
            .withIndex("by_notifiedAt", (q) => q.eq("notifiedAt", undefined))
            .take(25);
    },
});

export const markNotified = mutation({
    args: { secret: v.string(), id: v.id("leads") },
    handler: async (ctx, { secret, id }) => {
        assertBot(secret);
        await ctx.db.patch(id, { notifiedAt: Date.now() });
    },
});
