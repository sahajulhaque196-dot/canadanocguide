import React from 'react'

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* Top primary cyan ambient glow orb */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle secondary bottom-left blue glow */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[650px] h-[650px] bg-cyan-900/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle bottom-right purple/indigo ambient glow */}
      <div className="absolute top-[45%] right-[-15%] w-[550px] h-[550px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Dark vignette overlay for crisp readability and AdSense text contrast compliance */}
      <div className="absolute inset-0 bg-[#030712]/60 pointer-events-none" />
    </div>
  )
}

