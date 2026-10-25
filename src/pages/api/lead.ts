import type { APIRoute } from "astro";
export const prerender = false;
import { z } from "zod";
import { getConvex } from "../../lib/convex";
import { api } from "../../../convex/_generated/api";

const LeadSchema = z.object({
    name: z.string().min(1),
    company: z.string().min(1),
    phone: z.string().min(6),
    leadVolume: z.string().min(1),
    avgResponseTime: z.string().min(1),
    email: z.string().email().optional(),
    // allow relative path like "/obrigado" as well as absolute URLs
    redirect: z.string().optional(),
});

export const POST: APIRoute = async ({ request, redirect }) => {
    try {
        const form = await request.formData();
        const data = Object.fromEntries(form.entries());
        const parsed = LeadSchema.safeParse(data);
        if (!parsed.success) {
            return new Response(JSON.stringify({ error: "Dados inválidos" }), { status: 400 });
        }

        const { redirect: _redirect, ...lead } = parsed.data;
        await getConvex().mutation(api.leads.create, {
            ...lead,
            secret: import.meta.env.LEADS_INGEST_SECRET,
            userAgent: request.headers.get("user-agent") ?? undefined,
            referer: request.headers.get("referer") ?? undefined,
            ip: request.headers.get("x-forwarded-for") ?? undefined,
        });

        const url = parsed.data.redirect || "/obrigado";
        return redirect(url, 302);
    } catch (err) {
        console.error("/api/lead error", err);
        return new Response(JSON.stringify({ error: "Erro interno" }), { status: 500 });
    }
};


