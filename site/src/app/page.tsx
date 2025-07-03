"use client"

import AnimatedLogo from '@/components/AnimatedLogo';

import { motion } from 'framer-motion';


export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center w-full h-120 bg-gradient-to-b from-black to-gray-900">
            <div className="flex flex-col items-center w-full 
              h-[260px] sm:h-[360px] md:h-[360px] lg:h-[600px] xl:h-[700px] 2xl:h-[500px]">
              <AnimatedLogo />
            </div>


            <div className="text-2xl md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-foreground font-bold text-center mb-8">
              CAPITAL WAVE<br></br>ENTERTAINMENT
            </div>
          </div>

        </motion.div>
      </main>

    </div >
  )
}