'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const TopologyField = dynamic(() => import('@/components/ui/topology-field'), {
  ssr: false,
})

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* High-performance desktop 3D WebGL field (hidden on mobile to protect Core Web Vitals) */}
      <div className="hidden md:block w-full h-full">
        <TopologyField className="w-full h-full" brightness={1.2} />
      </div>

      {/* Lightweight mobile ambient glow */}
      <div className="block md:hidden absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(6,182,212,0.18),rgba(3,7,18,0))]" />

      {/* Dark vignette overlay for crisp readability and AdSense compliance */}
      <div className="absolute inset-0 bg-[#030712]/70 pointer-events-none" />
    </div>
  )
}
