import type React from "react"
import "@/app/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://capitalwavestudio.com"
const siteName = "Capital Wave Studio"
const siteDescription = "Elevate your sound with Capital Wave Studio, Victoria's premier music studio turned record label. Specializing in recording, music production, mixing, mastering, and artist development, we help you create and release your music with professional quality."
const ogImage = "/images/cws_logo.jpg"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "music studio", "recording studio", "Victoria BC", "music production",
    "mixing", "mastering", "record label", "audio recording", "video production",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  icons: {
    icon: [
      { url: "/favicon.ico", rel: "shortcut icon" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  appleWebApp: { title: "Capital Wave" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Header />
          {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}