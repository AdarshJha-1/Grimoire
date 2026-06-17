"use client"

import React from "react"
import logo from "@/public/images/logo.png"
import Image from "next/image"
import SignInButton from "@/components/SignInButton"
import { Sparkles, BookOpen, Wand2, Shield } from "lucide-react"

export default function UnauthenticatedPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground antialiased relative overflow-hidden">

            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <header className="w-full h-16 border-b border-border/40 bg-background/80 backdrop-blur-md px-5 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto h-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Image
                            src={logo}
                            alt="Grimoire Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                        <span className="font-heading font-black text-xl tracking-tight text-foreground/90">
                            Grimoire
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 border border-border/40 px-3 py-1.5 rounded-full">
                        <Shield className="h-3 w-3 text-primary" />
                        <span className="font-medium">Grimoire Spellbook Vault</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center gap-16 px-4 py-12 max-w-5xl mx-auto w-full z-10">

                <div className="text-center flex flex-col items-center gap-6 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-widest text-primary animate-pulse">
                        <Sparkles className="h-3 w-3" />
                        Artifact Extension Online
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-tight">
                        Bind Web Insights Into Your <span className="text-primary drop-shadow-[0_0_15px_rgba(34,197,94,0.2)]">Grimoire</span>
                    </h1>

                    <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed">
                        Welcome back, <span className="text-foreground font-semibold">Grimoire</span>. Highlight lines, quotes, and lore from any manga, light novel, website, or PDF, and sync them seamlessly into your personal library.
                    </p>

                    <div className="pt-4 scale-110 hover:scale-105 transition-transform duration-200">
                        <SignInButton />
                    </div>
                </div>

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-6">

                    <div className="bg-card/40 border border-border/40 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)] group">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Wand2 className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-base text-foreground/90 mb-1.5 flex items-center gap-1">
                            Instant Appraisal
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Highlight text on any active webpage or system PDF to evoke the floating Grimoire anchor tool.
                        </p>
                    </div>

                    <div className="bg-card/40 border border-border/40 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)] group">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-base text-foreground/90 mb-1.5">
                            Sage Summaries
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Let internal AI runes automatically digest massive narrative paragraphs into punchy, high-yield bulleted scrolls.
                        </p>
                    </div>

                    <div className="bg-card/40 border border-border/40 rounded-xl p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.05)] group">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-base text-foreground/90 mb-1.5 flex items-center gap-1">
                            Infinite Chronology
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Organize your text cards with custom tags. Teleport back to the original source text with deep-link bookmarks.
                        </p>
                    </div>

                </section>

            </main>

            <footer className="w-full border-t border-border/20 py-4 text-center text-[11px] text-muted-foreground/60 z-10 bg-background/50">
                Grimoire © {new Date().getFullYear()} — Powered by Wind Magic & Better Auth
            </footer>

        </div>
    )
}
