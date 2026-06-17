import Image from "next/image";

export default function NotFound() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-background">
            <div className="absolute left-8 md:left-70 top-80 -translate-y-1/2 max-w-xl">
                <h1 className="flex items-center gap-4 text-accent-foreground font-bold text-[120px] md:text-[180px] leading-none">
                    <span>4</span>
                    <span className="text-7xl md:text-9xl">☠️</span>
                    <span>4</span>
                </h1>

                <div className="mt-4 flex items-center gap-6">
                    <div className="h-px w-20 bg-accent-foreground" />
                    <p className="text-accent-foreground text-2xl md:text-4xl font-medium whitespace-nowrap">
                        Page Not Found
                    </p>
                    <div className="h-px flex-1 bg-white/40" />
                </div>

                <p className="mt-4 text-muted- text-lg">
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
            </div>

            <Image
                src="/images/ichigo-404-page.png"
                alt="404"
                width={450}
                height={450}
                priority
                className="absolute bottom-0 right-50 h-auto"
            />
        </main>
    );
}