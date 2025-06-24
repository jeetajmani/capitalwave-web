// import Image from "next/image";

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
// import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedFlashButton } from "@/components/ui/flashbutton"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Menu,
  X,
} from "lucide-react"


export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // }

  // const item = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0 },
  // }
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-0 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span>CAPITAL WAVE</span>
          </div>
          <nav className="hidden md:flex gap-8 flex-1 justify-center">
            <Link
              href="/services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/roster"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Roster
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Gallery
            </Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <AnimatedFlashButton text="Book Now" className="rounded-full" variant="outline"/>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 px-4 flex flex-col gap-4">
              <Link href="/services" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Services
              </Link>
              <Link href="/roster" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Roster
              </Link>
              <Link href="/events" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Events
              </Link>
              <Link href="/gallery" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                Gallery
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button className="rounded-full">
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </div>
  )
}