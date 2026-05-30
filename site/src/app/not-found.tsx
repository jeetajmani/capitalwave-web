import Link from 'next/link'
import { AnimatedFlashButton } from '@/components/ui/flashbutton'

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-20 py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Error 404</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-widest uppercase mb-6">Off The Grid</h1>
        <p className="text-sm text-muted-foreground tracking-wider max-w-md mb-10">
          This page doesn&apos;t exist — or maybe it was unreleased. Either way, let&apos;s get you back to something we can play.
        </p>
        <Link href="/">
          <AnimatedFlashButton text="Back to Home" variant="outline" size="lg" />
        </Link>
      </main>
    </div>
  )
}
