import { aiClient } from "./gemini";
import { Schema, Type } from "@google/genai";

const appraisalSchema: Schema = {
    type: Type.OBJECT,
    properties: {
        aiSummary: {
            type: Type.STRING,
            description: "A professional, concise bulleted summary analyzing the core substance of the text clipping.",
        },
        tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 lowercase category classification tags matching the content (e.g., 'nextjs', 'cardiology', 'cooking').",
        },
    },
    required: ["aiSummary", "tags"],
};

export async function appraiseFragment(rawText: string) {
    try {
        const response = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze and summarize this user-clipped text snippet. It could be from a programming blog, research paper, recipe, or news article. Provide a clean breakdown: "${rawText}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: appraisalSchema,
                temperature: 0.2,
            },
        });

        const responseText = response.text;
        if (!responseText) throw new Error("Runes could not read this data field stream.");

        return JSON.parse(responseText) as { aiSummary: string; tags: string[] };

    } catch (error) {
        console.error("General-purpose appraisal failure:", error);
        return {
            aiSummary: "Could not parse or process the semantic csontent of this note shard.",
            tags: ["general"],
        };
    }
}
