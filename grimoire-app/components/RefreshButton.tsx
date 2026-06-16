"use client"

import React, { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { RefreshCw } from "lucide-react"

export function RefreshButton() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleRefresh = () => {
        startTransition(() => {
            // Re-executes the parent Server Component's async data fetch loops instantly
            router.refresh()
        })
    }

    return (
        <button
            onClick={handleRefresh}
            disabled={isPending}
            className="inline-flex h-9 items-center justify-center gap-1.5 px-3 rounded-md border border-border/60 bg-card text-xs font-semibold text-foreground hover:text-primary hover:border-primary/40 active:scale-98 transition-all disabled:opacity-50 cursor-pointer shadow-sm shadow-primary/5 group"
            title="Press to channel latest scroll updates"
        >
            <RefreshCw
                className={`h-3.5 w-3.5 transition-transform duration-500 ${isPending ? "animate-spin text-primary" : "group-hover:rotate-180"
                    }`}
            />
            <span>{isPending ? "Channelling..." : "Sync Grimoire"}</span>
        </button>
    )
}
