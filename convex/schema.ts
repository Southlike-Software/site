import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    leads: defineTable({
        name: v.string(),
        company: v.string(),
        phone: v.string(),
        leadVolume: v.string(),
        avgResponseTime: v.string(),
        email: v.optional(v.string()),
        source: v.string(),
        userAgent: v.optional(v.string()),
        referer: v.optional(v.string()),
        ip: v.optional(v.string()),
        // set when the lead is imported from the old MongoDB collection
        legacyCreatedAt: v.optional(v.number()),
    }),
});
