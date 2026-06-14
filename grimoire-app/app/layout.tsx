import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})


export const metadata: Metadata = {
  // metadataBase: new URL("https://my-domain.com"),
  title: {
    default: "Grimoire",
    template: "%s | Grimoire",
  },

  description: "One place for all important notes and bookmarks.",
  applicationName: "Grimoire",
  keywords: [
    "grimoire",
    "notes",
    "bookmarks",
    "knowledge base",
    "documentation",
    "study notes",
    "personal wiki",
  ],

  authors: [
    {
      name: "Adarsh Jha",
    },
  ],
  creator: "Adarsh Jha",

  manifest: "/favicon_io/site.webmanifest",

  icons: {
    icon: [
      {
        url: "/favicon_io/favicon.ico",
      },
      {
        url: "/favicon_io/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    shortcut: "/favicon_io/favicon.ico",
  },

  openGraph: {
    title: "Grimoire",
    description:
      "Organize notes, bookmarks, resources, and knowledge in your personal Grimoire. Fast, searchable, and beautifully organized.",
    siteName: "Grimoire",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1024,
        height: 1024,
        alt: "Grimoire Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Grimoire",
    description: "One place for all important notes and bookmarks.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  category: "productivity",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7BC96F" },
    { media: "(prefers-color-scheme: dark)", color: "#0F2A16" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
