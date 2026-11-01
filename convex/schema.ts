import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const leadStatus = v.union(
    v.literal("novo"),
    v.literal("contatado"),
    v.literal("negociando"),
    v.literal("ganho"),
    v.literal("perdido"),
);

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
        // set by the Discord bot once the lead is posted to Southlike Hub
        notifiedAt: v.optional(v.number()),
        // forum post the bot opened for this lead in Southlike Hub #leads
        discordThreadId: v.optional(v.string()),
        // pipeline stage, changed from the Discord post's buttons; unset = novo
        status: v.optional(leadStatus),
    }).index("by_notifiedAt", ["notifiedAt"]),
});
