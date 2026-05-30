"use client"

import { useEffect } from 'react'
import Link from 'next/link'
import { AnimatedFlashButton } from '@/components/ui/flashbutton'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-20 py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Something Broke</p>
        <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase mb-6">Static On The Line</h1>
        <p className="text-sm text-muted-foreground tracking-wider max-w-md mb-10">
          We hit an unexpected error. Try again, or head back to the home page.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => reset()} className="cursor-pointer">
            <AnimatedFlashButton text="Try Again" variant="outline" size="lg" />
          </button>
          <Link href="/">
            <AnimatedFlashButton text="Back to Home" variant="outline" size="lg" />
          </Link>
        </div>
      </main>
    </div>
  )
}
