import type React from "react"
import "@/app/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Capital Wave Studio",
  description: "Elevate your sound with Capital Wave Studio, Victoria's premier music studio turned record label. Specializing in recording, music production, mixing, mastering, and artist development, we help you create and release your music with professional quality. Join us to transform your musical vision into reality.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}