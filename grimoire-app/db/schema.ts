import { pgTable, text, varchar, timestamp, boolean, uuid, index } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, {
        fields: [session.userId],
        references: [user.id],
    }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, {
        fields: [account.userId],
        references: [user.id],
    }),
}));

export const fragments = pgTable('fragments', {
    id: text("id").primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => user.id, { onDelete: 'cascade' }),

    pageTitle: varchar('page_title', { length: 500 }).notNull(),
    sourceUrl: text('source_url').notNull(),
    faviconUrl: text('favicon_url'),

    rawText: text('raw_text').notNull(),
    aiSummary: text('ai_summary'),

    tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),

    isFavorite: boolean('is_favorite').default(false).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
}, (table) => [
    index('user_id_idx').on(table.userId),
]);

export const userRelations = relations(user, ({ many }) => ({
    fragments: many(fragments),
}));

export const fragmentsRelations = relations(fragments, ({ one }) => ({
    user: one(user, {
        fields: [fragments.userId],
        references: [user.id],
    }),
}));



export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Fragment = typeof fragments.$inferSelect;
export type NewFragment = typeof fragments.$inferInsert;


export const schema = {
    user,
    session,
    account,
    verification,
    fragments
} as const;