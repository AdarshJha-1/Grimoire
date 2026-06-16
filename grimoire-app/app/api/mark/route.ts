import { db } from "@/db/drizzle";
import { fragments } from "@/db/schema";
import { getServerSession } from "@/lib/getServerSession";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { createFragmentSchema } from "@/lib/validation";
import { appraiseFragment } from "@/lib/summarize";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {

        const userFragments = await db.query.fragments.findMany({
            where: eq(fragments.userId, session.user.id)
        });

        return Response.json({
            success: true,
            data: userFragments
        }, { status: 200 });

    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to retrieve your grimoire scrolls.",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized",
        }, { status: 401 });
    }

    try {
        const body = await req.json();

        const result = createFragmentSchema.safeParse(body);
        if (!result.success) {
            return Response.json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { data: rawData } = result

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

        return Response.json({ success: true, data: newNote[0] }, { status: 201 });

    } catch (error) {
        return Response.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
