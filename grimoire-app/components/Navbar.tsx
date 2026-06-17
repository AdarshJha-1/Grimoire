import Image from "next/image"
import Link from "next/link"
import logo from "@/public/images/logo.png"
import Auth from "./Auth"

export default function Navbar({ className }: { className?: string }) {
    return (
        <nav
            className={`w-full h-16 border-b border-border/40 bg-background/70 backdrop-blur-md px-5 sticky top-0 z-50 transition-all duration-300 ${className}`}
        >
            <div className="max-w-6xl mx-auto h-full flex justify-between items-center">
                <Link
                    href="/"
                    className="flex items-center gap-2.5 group transition-transform duration-200 active:scale-98"
                >
                    <div className="relative flex items-center justify-center">
                        <Image
                            src={logo}
                            alt="Nakama Logo"
                            width={50}
                            height={50}
                            className="object-contain transition-transform duration-300 group-hover:rotate-12 z-10"
                        />

                        <div className="absolute h-9 w-9 bg-primary/40 rounded-full blur-sm shadow-[0_0_14px_rgba(34,197,94,0.6)] group-hover:shadow-[0_0_24px_rgba(34,197,94,0.95)] opacity-80 group-hover:opacity-100 transition-all duration-300 -z-10" />
                    </div>

                    <h1 className="font-heading font-black text-xl tracking-tight bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hidden sm:block">
                        Grimoire
                    </h1>
                </Link>

                <div className="flex items-center gap-4">
                    <Auth />
                </div>

            </div>
        </nav>
    )
}
