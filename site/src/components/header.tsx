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
            const h = headerRef.current.offsetHeight
            setHeaderHeight(h)
            document.documentElement.style.setProperty('--header-height', `${h}px`)
        }
    }, [])

    // Update header height on window resize
    useLayoutEffect(() => {
        const handleResize = () => {
            if (headerRef.current) {
                const h = headerRef.current.offsetHeight
                setHeaderHeight(h)
                document.documentElement.style.setProperty('--header-height', `${h}px`)
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
                    <div className="font-black text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-foreground ">

                        <div className="flex items-center gap-2">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <Image
                                    src="/images/header_logo.png"
                                    alt="Capital Wave Logo"
                                    width={10000}
                                    height={10000}
                                    loading="eager"
                                    className="h-[0.9em] w-auto object-contain align-baseline"
                                />
                            </Link>
                            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                <span className="whitespace-nowrap tracking-widest text-white">CAPITAL WAVE</span>
                            </Link>
                        </div>

                    </div>
                    <nav className="hidden md:flex md:gap-4 lg:gap-8 xl:gap-12 justify-center">
                        <Link
                            href="/services"
                            className="font-medium tracking-widest uppercase text-xs lg:text-sm xl:text-base text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Services
                        </Link>
                        <Link
                            href="/roster"
                            className="font-medium tracking-widest uppercase text-xs lg:text-sm xl:text-base text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Roster
                        </Link>
                        <Link
                            href="/events"
                            className="font-medium tracking-widest uppercase text-xs lg:text-sm xl:text-base text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Events
                        </Link>
                    </nav>
                    <div className="hidden md:flex flex-1 gap-4 items-center justify-end justify-self-end">
                        <Link href="/book">
                            <AnimatedFlashButton text="Book Now" variant="outline" />
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
                        className="md:hidden fixed inset-0 w-full h-full bg-black z-50 border-b border-neutral-800"
                        style={{ top: headerHeight }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <div className="pt-8 pb-12 px-6 flex flex-col gap-6 items-center" onClick={e => {
                            const target = e.target as HTMLElement;
                            if (target.closest('a')) {
                                setTimeout(() => setMobileMenuOpen(false), 100);
                            }
                            e.stopPropagation();
                        }}>
                            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="py-3 font-medium tracking-widest uppercase text-[22px] text-muted-foreground transition-colors hover:text-foreground">
                                Services
                            </Link>
                            <Link href="/roster" className="py-3 font-medium tracking-widest uppercase text-[22px] text-muted-foreground transition-colors hover:text-foreground">
                                Roster
                            </Link>
                            <Link href="/events" className="py-3 font-medium tracking-widest uppercase text-[22px] text-muted-foreground transition-colors hover:text-foreground">
                                Events
                            </Link>
                            <div className="flex flex-col gap-2 pt-2 items-center">
                                <AnimatedFlashButton
                                    text="Book Now"
                                    className="px-10 py-9 text-[26px]"
                                    variant="outline"
                                    onClick={() => setMobileMenuOpen(false)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    )
}

export default Header