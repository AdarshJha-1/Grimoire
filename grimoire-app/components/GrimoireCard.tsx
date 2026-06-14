import React from 'react'
import { Shield, Sparkles, BookOpen, Clock } from "lucide-react"

interface GrimoireCardProps {
    title: string
    sourceUrl: string
    rawText: string
    aiSummary: string
    tags: string[]
    timestamp: string
}

export function GrimoireCard({
    title,
    sourceUrl,
    rawText,
    aiSummary,
    tags,
    timestamp
}: GrimoireCardProps) {
    return (
        <div className="flex flex-col rounded-lg border border-border bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)] hover:border-primary/40 hover:-translate-y-1 overflow-hidden">

            <div className="p-4 pb-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-medium tracking-wide">
                        <BookOpen className="h-3.5 w-3.5 text-primary/80" />
                        {new URL(sourceUrl).hostname}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {timestamp}
                    </span>
                </div>
                <h3 className="line-clamp-1 font-sans text-base font-bold tracking-tight text-foreground/90">
                    {title}
                </h3>
            </div>

            <div className="px-4 pb-4 flex-1 space-y-4">
                <div className="relative border-l-2 border-primary/40 bg-muted/40 p-3 italic text-muted-foreground/90 rounded-r">
                    <p className="text-xs sm:text-sm leading-relaxed line-clamp-4">"{rawText}"</p>
                </div>

                <div className="rounded border border-border/40 bg-background/50 p-3">
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <Sparkles className="h-3 w-3" />
                        Sage Appraisal
                    </div>
                    <p className="text-foreground/80 leading-relaxed text-xs">
                        {aiSummary}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-border/30 bg-muted/20 px-4 py-2.5 mt-auto">
                <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-medium tracking-wide lowercase border border-border/30"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-7 items-center gap-1 px-2.5 rounded border border-primary/20 text-[11px] font-bold text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                    <Shield className="h-3 w-3" />
                    Source
                </a>
            </div>

        </div>
    )
}
