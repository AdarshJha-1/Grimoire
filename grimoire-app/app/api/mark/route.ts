import { db } from "@/db/drizzle";
import { fragments } from "@/db/schema";
import { getServerSession } from "@/lib/getServerSession";
import { NextRequest } from "next/server";
import { createFragmentSchema } from "@/lib/validation";
import { appraiseFragment } from "@/lib/summarize";

function getCorsHeaders(req: NextRequest) {
    const origin = req.headers.get("origin") || "";
    const allowedOrigins = [
        "http://localhost:3000",
        process.env.EXTENSION_ID || "",
    ];

    const isAllowed = allowedOrigins.includes(origin) || allowedOrigins.includes(`chrome-extension://${origin.replace('chrome-extension://', '')}`);
    const finalOrigin = isAllowed ? origin : (process.env.EXTENSION_ID || "http://localhost:3000");

    return {
        "Access-Control-Allow-Origin": finalOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
        "Access-Control-Allow-Credentials": "true",
    };
}

export async function OPTIONS(req: NextRequest) {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(req),
    });
}

export async function POST(req: NextRequest) {
    const corsHeaders = getCorsHeaders(req);
    const session = await getServerSession();

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized",
        }, {
            status: 401,
            headers: corsHeaders
        });
    }

    try {
        const body = await req.json();

        const result = createFragmentSchema.safeParse(body);
        if (!result.success) {
            return Response.json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors
            }, {
                status: 400,
                headers: corsHeaders
            });
        }

        const { data: rawData } = result;

        const { aiSummary, tags } = await appraiseFragment(rawData.rawText);

        const newNote = await db.insert(fragments).values({
            id: crypto.randomUUID(),
            userId: session.user.id,
            pageTitle: rawData.pageTitle,
            sourceUrl: rawData.sourceUrl,
            faviconUrl: rawData.faviconUrl,
            rawText: rawData.rawText,
            aiSummary: aiSummary,
            tags: tags,
            isFavorite: rawData.isFavorite,
        }).returning();

        return Response.json(
            { success: true, data: newNote[0] },
            {
                status: 201,
                headers: corsHeaders
            }
        );

    } catch (error) {
        console.error("Backend error clipping node:", error);
        return Response.json({
            success: false,
            message: "Server error"
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
