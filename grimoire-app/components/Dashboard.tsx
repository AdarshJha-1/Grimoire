import React from "react"
import { desc, eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { GrimoireCard } from "@/components/GrimoireCard"
import { RefreshButton } from "@/components/RefreshButton" // 👈 Imported your new client refresh mechanism
import { ShieldAlert, BookOpen, Layers, Search, Sparkles } from "lucide-react"
import { getServerSession } from "@/lib/getServerSession"
import { db } from "@/db/drizzle"
import { fragments } from "@/db/schema"

export default async function Dashboard() {
    const session = await getServerSession()
    if (!session || !session.user) {
        redirect("/")
    }

    const userFragments = await db.query.fragments.findMany({
        where: eq(fragments.userId, session.user.id),
        orderBy: [desc(fragments.createdAt)]
    })

    const totalFragments = userFragments.length
    const uniqueDomainsCount = new Set(
        userFragments.map(f => {
            try { return new URL(f.sourceUrl).hostname }
            catch { return "unknown" }
        })
    ).size

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
            <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                        Your Archive Grimoire
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Reviewing bound fragments and knowledge summaries synced from your browser extension.
                    </p>
                </div>

                {/* 🛠️ Header Control Row Deck */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search through spellbooks..."
                            className="w-full bg-card border border-border/60 rounded-md py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-all placeholder:text-muted-foreground/60"
                        />
                    </div>
                    {/* Injected active refresh execution node trigger */}
                    <RefreshButton />
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-card border border-border/40 p-5 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total Fragments</div>
                        <div className="text-2xl font-black mt-0.5">{totalFragments} Notes</div>
                    </div>
                </div>

                <div className="bg-card border border-border/40 p-5 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <Layers className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Unique Sources</div>
                        <div className="text-2xl font-black mt-0.5">{uniqueDomainsCount} Domains</div>
                    </div>
                </div>

                <div className="bg-card border border-border/40 p-5 rounded-xl flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Sync Status</div>
                        <div className="text-sm font-bold text-primary flex items-center gap-1.5 mt-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary inline-block animate-ping" />
                            Grimoire Online
                        </div>
                    </div>
                </div>
            </section>

            {totalFragments === 0 ? (
                <div className="text-center py-25 border border-dashed border-border/40 rounded-xl bg-card/20">
                    <p className="text-sm text-muted-foreground">Your Grimoire is empty. Highlight something on the web to bind your first note!</p>
                </div>
            ) : (
                <main className="max-w-4xl mx-auto flex flex-col gap-4 w-full pt-2">
                    {userFragments.map((clip) => (
                        <GrimoireCard
                            key={clip.id}
                            title={clip.pageTitle}
                            sourceUrl={clip.sourceUrl}
                            faviconUrl={clip.faviconUrl}
                            rawText={clip.rawText}
                            aiSummary={clip.aiSummary ?? "Appraisal pending..."}
                            tags={clip.tags}
                            timestamp={new Date(clip.createdAt).toLocaleDateString()}
                        />
                    ))}
                </main>
            )}
        </div>
    )
}
