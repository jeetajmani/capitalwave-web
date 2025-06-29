"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedFlashButton } from "@/components/ui/flashbutton"
import {
    Menu,
    X,
} from "lucide-react"

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full transition-all duration-300 bg-black/40 backdrop-blur-sm">
            <div className="p-4">
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                >
                    <div className="container mx-auto px-4 sm:px-6 md:px-0 flex h-16 items-center justify-between">
                        <div className="flex-1 flex items-center gap-2 font-bold text-2xl text-foreground mx-4">
                            <Link href="/" className="flex items-center">
                                <span>CAPITAL WAVE</span>
                            </Link>
                        </div>
                        <nav className="hidden md:flex gap-6 md:gap-8 lg:gap-12 justify-center text-md">
                            <Link
                                href="/services"
                                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Services
                            </Link>
                            <Link
                                href="/roster"
                                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Roster
                            </Link>
                            <Link
                                href="/events"
                                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Events
                            </Link>
                            <Link
                                href="/gallery"
                                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Gallery
                            </Link>
                        </nav>
                        <div className="hidden md:flex flex-1 gap-4 items-center justify-end">
                            <Link href="/book">
                                <AnimatedFlashButton text="Book Now" className="rounded-full" variant="outline" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="cursor-pointer"
                            >
                                {mobileMenuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="md:hidden absolute left-0 right-0 top-full bg-black/40"
                    >
                        <div className="w-full max-w-xl mx-auto pt-2 pb-12 px-4 flex flex-col gap-6 text-4xl items-center justify-center">
                            <Link href="/services" className="py-2 font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Services
                            </Link>
                            <Link href="/roster" className="py-2 font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Roster
                            </Link>
                            <Link href="/events" className="py-2 font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Events
                            </Link>
                            <Link href="/gallery" className="py-2 font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Gallery
                            </Link>
                            <div className="flex flex-col gap-2 pt-2 items-center">
                                <AnimatedFlashButton
                                    text="Book Now"
                                    className="rounded-full px-10 py-9 text-3xl"
                                    variant="outline"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header