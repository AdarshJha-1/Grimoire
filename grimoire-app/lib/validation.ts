import { z } from 'zod';
export const createFragmentSchema = z.object({
    pageTitle: z.string()
        .min(1, "Page title cannot be left blank.")
        .max(500, "Page title cannot exceed 500 characters."),

    sourceUrl: z.string()
        .url("A valid source website or file URL string is required."),

    faviconUrl: z.string()
        .url("Favicon target must be a valid URL string.")
        .nullable()
        .optional(),

    rawText: z.string()
        .min(1, "You must highlight text context to bind a note fragment."),

    aiSummary: z.string()
        .nullable()
        .optional(),

    tags: z.array(z.string())
        .default([]),

    isFavorite: z.boolean()
        .default(false),
});

export const updateFragmentSchema = createFragmentSchema.partial();

export type CreateFragmentInput = z.infer<typeof createFragmentSchema>;
export type UpdateFragmentInput = z.infer<typeof updateFragmentSchema>;
