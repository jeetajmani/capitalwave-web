"use client"

import AnimatedLogo from '@/components/AnimatedLogo';

import { motion } from 'framer-motion';


export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="flex items-center justify-center h-full"
        >
          <AnimatedLogo />
        </motion.div>
      </main>

    </div>
  )
} 