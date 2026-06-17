"use client"

import React from 'react'
import { Shield, Sparkles, BookOpen, Clock } from "lucide-react"
import Image from 'next/image';

interface GrimoireCardProps {
    title: string
    sourceUrl: string
    faviconUrl?: string | null
    rawText: string
    aiSummary: string
    tags: string[]
    timestamp: string
}

export function GrimoireCard({
    title,
    sourceUrl,
    faviconUrl,
    rawText,
    aiSummary,
    tags,
    timestamp
}: GrimoireCardProps) {

    const displayDomain = React.useMemo(() => {
        try { return new URL(sourceUrl).hostname }
        catch { return "web source" }
    }, [sourceUrl])

    const delimiter = aiSummary.trim().startsWith('-') ? '-' : '*';

    return (
        <div className="w-full max-w-none flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.16)] hover:border-primary/50 hover:-translate-y-1.5 overflow-hidden group">

            <div className="p-6 pb-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-2 font-medium tracking-wide">
                        {faviconUrl ? (
                            <Image
                                src={faviconUrl}
                                alt="faviconUrl"
                                width={20}
                                height={20}
                                className="h-4 w-4 rounded-sm object-contain bg-background"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />
                        ) : (
                            <BookOpen className="h-4 w-4 text-primary/80" />
                        )}
                        <span className="truncate max-w-[140px] sm:max-w-[180px]">{displayDomain}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs opacity-80 shrink-0">
                        <Clock className="h-3 w-3" />
                        {timestamp}
                    </span>
                </div>

                <h3 className="line-clamp-2 font-sans text-lg font-extrabold tracking-tight text-foreground/90 leading-snug">
                    {title}
                </h3>
            </div>

            <div className="px-6 pb-6 flex-1 space-y-5">
                <div className="relative border-l-2 border-primary/50 bg-muted/40 p-4 italic text-muted-foreground/90 rounded-r shadow-inner">
                    <p className="text-sm leading-relaxed line-clamp-5 text-foreground/80 break-words">
                        &quot;{rawText}&quot;
                    </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background/60 p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wider text-primary">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                        Sage Appraisal
                    </div>

                    <ul className="list-disc pl-4 space-y-2 text-foreground/90 text-sm font-medium leading-relaxed break-words">
                        {aiSummary
                            .split(delimiter)
                            .map((item) => item.trim())
                            .filter((item) => item.length > 0)
                            .map((bullet, index) => {
                                const parts = bullet.split(/(`[^`]+`)/g);

                                return (
                                    <li key={index} className="marker:text-primary/70">
                                        {parts.map((part, i) => {
                                            if (part.startsWith('`') && part.endsWith('`')) {
                                                return (
                                                    <code key={i} className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs font-semibold text-foreground border border-border mx-0.5 inline-block break-all">
                                                        {part.slice(1, -1)}
                                                    </code>
                                                );
                                            }
                                            return part;
                                        })}
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/30 bg-muted/20 px-6 py-3.5 mt-auto">
                <div className="flex flex-wrap gap-1.5 w-full sm:max-w-[70%]">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-md bg-secondary text-secondary-foreground text-[10px] font-bold tracking-wide border border-border/40 hover:border-primary/30 transition-colors"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 items-center justify-center gap-1.5 px-3.5 rounded-md border border-primary/20 text-xs font-bold text-primary bg-background/40 hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-sm w-full sm:w-auto shrink-0"
                >
                    <Shield className="h-3.5 w-3.5" />
                    Source
                </a>
            </div>

        </div>
    )
}
