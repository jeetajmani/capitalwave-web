// components/GlitchText.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionTemplate } from "framer-motion";

interface GlitchTextProps {
  text?: string;
  className?: string;
  baseGlitchSpeed?: number;
  hoverGlitchSpeed?: number;
  glitchIntensity?: number;
  color?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text = "SONIC STUDIO",
  className = "",
  baseGlitchSpeed = 3000,
  hoverGlitchSpeed = 150,
  glitchIntensity = 0.06,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";
  const originalText = text;

  const triggerGlitch = useCallback(() => {
    if (glitchActive) return;
    
    setGlitchActive(true);
    const intensity = isHovered ? glitchIntensity * 3 : glitchIntensity;
    
    let glitchCount = 0;
    const maxGlitches = Math.floor(originalText.length * intensity);
    
    const glitchInterval = setInterval(() => {
      const newText = originalText
        .split("")
        .map((char) => {
          if (Math.random() < intensity && glitchCount < maxGlitches) {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join("");
      
      setDisplayText(newText);
      glitchCount++;
      
      if (glitchCount >= 3) {
        clearInterval(glitchInterval);
        setTimeout(() => {
          setDisplayText(originalText);
          setGlitchActive(false);
        }, 100);
      }
    }, 80);
    
  }, [originalText, glitchIntensity, isHovered, glitchActive]);

  useEffect(() => {
    const startGlitchCycle = () => {
      const speed = isHovered ? hoverGlitchSpeed : baseGlitchSpeed;
      const randomDelay = Math.random() * (speed * 0.5);
      
      timeoutRef.current = setTimeout(() => {
        triggerGlitch();
        intervalRef.current = setInterval(triggerGlitch, speed);
      }, randomDelay);
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    startGlitchCycle();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, triggerGlitch, baseGlitchSpeed, hoverGlitchSpeed]);

  const textShadow = useMotionTemplate`
    ${isHovered ? `0 0 10px #3b82f6, 0 0 10px #3b82f6, 0 0 10px #3b82f6,` : ''} 
    2px 2px 0px rgba(0,0,0,0.8),
    -2px -2px 0px rgba(0,0,0,0.8)
  `;

  return (
    <div className="relative">
      <motion.h1
        className={`
          font-bold text-4xl md:text-5xl
          font-mono tracking-wider
          text-white whitespace-nowrap
          cursor-not-allowed
          select-none
          transition-[color,filter] duration-300
          ${className}
        `}
        style={{
          textShadow,
          filter: glitchActive ? "hue-rotate(90deg) saturate(2)" : "none",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          filter: glitchActive 
            ? ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
            : "hue-rotate(0deg)",
        }}
        transition={{
          duration: glitchActive ? 0.1 : 0.3,
          repeat: glitchActive ? 3 : 0,
        }}
      >
        {displayText.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            animate={{
              y: glitchActive && Math.random() < 0.3 ? [0, -2, 2, 0] : 0,
              x: glitchActive && Math.random() < 0.2 ? [0, -1, 1, 0] : 0,
            }}
            transition={{
              duration: 0.1,
              repeat: glitchActive ? 2 : 0,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
      
      {/* Glitch overlay effects */}
      {glitchActive && (
        <motion.div
          // className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none"
          // animate={{
          //   x: ["-100%", "100%"],
          //   opacity: [0, 1, 0],
          // }}
          // transition={{
          //   duration: 0.2,
          //   repeat: 2,
          // }}
        />
      )}
    </div>
  );
};

export default GlitchText;