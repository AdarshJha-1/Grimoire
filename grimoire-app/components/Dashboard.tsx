import React from 'react'
import { GrimoireCard } from "@/components/GrimoireCard"
import { ShieldAlert, BookOpen, Layers, Search, Sparkles } from "lucide-react"

// Simulated database response for the current logged-in user
const sampleClips = [
    {
        id: "1",
        title: "Omniscient Reader's Viewpoint - Ch. 182",
        sourceUrl: "https://webtoons.com",
        rawText: "There are three ways to survive in a ruined world. Now, I have forgotten a few, but one thing is certain. The fact that you who are reading these words will survive.",
        aiSummary: "The overarching theme statement of the series establishing the core condition of survival tied directly to textual observation.",
        tags: ["manhwa", "orv", "quotes"],
        timestamp: "2 hours ago"
    },
    {
        id: "2",
        title: "System Design Frameworks PDF - Page 42",
        sourceUrl: "https://academy.dev",
        rawText: "Stateless architectures scale horizontally by offloading session data storage to distributed caching layers like Redis or distributed transactional relational databases.",
        aiSummary: "Architectural strategy outlining horizontal scaling mechanics via external token caches.",
        tags: ["backend", "pdf", "dev"],
        timestamp: "Yesterday"
    },
    {
        id: "3",
        title: "Frieren: Beyond Journey's End - Episode 10",
        sourceUrl: "https://crunchyroll.com",
        rawText: "The magic that is visualizable is the magic that can be executed. If you cannot clearly picture yourself overcoming the absolute defense of your opponent, your mana will shatter.",
        aiSummary: "The conceptual boundary of combat visualization logic ruling elven magical systems.",
        tags: ["anime", "magic-theory"],
        timestamp: "3 days ago"
    }
]

export default function Dashboard() {
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

                <div className="relative max-w-sm w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search through spellbooks..."
                        className="w-full bg-card border border-border/60 rounded-md py-2 pl-9 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/60 transition-all placeholder:text-muted-foreground/60"
                    />
                </div>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border/40 p-4 rounded-lg flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                        <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-semibold">Total Fragments</div>
                        <div className="text-xl font-bold">{sampleClips.length} Notes</div>
                    </div>
                </div>

                <div className="bg-card border border-border/40 p-4 rounded-lg flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                        <Layers className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-semibold">Unique Sources</div>
                        <div className="text-xl font-bold">3 Domains</div>
                    </div>
                </div>

                <div className="bg-card border border-border/40 p-4 rounded-lg flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                        <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase font-semibold">Sync Status</div>
                        <div className="text-sm font-semibold text-primary flex items-center gap-1.5 mt-0.5">
                            <span className="h-2 w-2 rounded-full bg-primary inline-block animate-ping" />
                            Grimoire Online
                        </div>
                    </div>
                </div>
            </section>

            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleClips.map((clip) => (
                    <GrimoireCard
                        key={clip.id}
                        title={clip.title}
                        sourceUrl={clip.sourceUrl}
                        rawText={clip.rawText}
                        aiSummary={clip.aiSummary}
                        tags={clip.tags}
                        timestamp={clip.timestamp}
                    />
                ))}
            </main>

        </div>
    )
}
