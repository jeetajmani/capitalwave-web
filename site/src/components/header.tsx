"use client"

import { useState, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedFlashButton } from "@/components/ui/flashbutton"
import {
    Menu,
    X,
} from "lucide-react"
import Image from "next/image"

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [headerHeight, setHeaderHeight] = useState(0)
    const headerRef = useRef<HTMLElement | null>(null)

    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight)
        }
    }, [])

    // Update header height on window resize
    useLayoutEffect(() => {
        const handleResize = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <header
            ref={headerRef}
            className="sticky top-0 z-50 w-full transition-all duration-300 bg-black shadow-md border-b border-neutral-800"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
            >
                <div className="w-full mx-auto px-6 lg:px-20 py-4 grid md:grid-cols-3 items-center justify-items-stretch">
                    <div className="font-bold text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-foreground ">
                        <Link href="/">
                            <span className="flex items-center gap-2">
                                <Image
                                    src="/images/header_logo.png"
                                    alt="Capital Wave Logo"
                                    width={10000}
                                    height={10000}
                                    className="h-[0.9em] w-auto object-contain align-baseline"
                                />
                                <span className="whitespace-nowrap">CAPITAL WAVE</span>
                            </span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex md:gap-2 lg:gap-4 xl:gap-10 justify-center text-md md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
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
                            href="/showcase"
                            className="font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Showcase
                        </Link>
                    </nav>
                    <div className="hidden md:flex flex-1 gap-4 items-center justify-end justify-self-end">
                        <Link href="/book">
                            <AnimatedFlashButton text="Book Now" className="rounded-full" variant="outline" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 md:hidden col-span-2 col-start-3 justify-end">
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
            {/* Mobile menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="md:hidden fixed left-0 right-0 w-full max-w-xl bg-black/40 backdrop-blur-sm z-50 shadow-md border-b border-neutral-800 mx-auto"
                        style={{ top: headerHeight }}
                    >
                        <div className="pt-5 pb-12 px-4 flex flex-col gap-8 text-4xl items-center font-normal">
                            <Link href="/services" className="py-2 text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Services
                            </Link>
                            <Link href="/roster" className="py-2 text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Roster
                            </Link>
                            <Link href="/events" className="py-2 text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Events
                            </Link>
                            <Link href="/showcase" className="py-2 text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
                                Showcase
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