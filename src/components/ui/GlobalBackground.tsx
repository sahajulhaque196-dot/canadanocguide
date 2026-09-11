'use client'

import React, { useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'

const TopologyField = dynamic(() => import('@/components/ui/topology-field'), {
  ssr: false,
})

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', callback)
  return () => mediaQuery.removeEventListener('change', callback)
}

function getReducedMotionSnapshot() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServerSnapshot() {
  return false
}

export default function GlobalBackground() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  )

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#030712]">
      {/* High-performance desktop 3D WebGL field (hidden on mobile and when reduced motion is preferred) */}
      {!reducedMotion && (
        <div className="hidden md:block w-full h-full">
          <TopologyField className="w-full h-full" brightness={1.2} />
        </div>
      )}

      {/* Lightweight ambient glow (for mobile and reduced-motion environments) */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-10%,rgba(6,182,212,0.18),rgba(3,7,18,0))] ${
          !reducedMotion ? 'block md:hidden' : 'block'
        }`}
      />

      {/* Dark vignette overlay for crisp readability and AdSense compliance */}
      <div className="absolute inset-0 bg-[#030712]/70 pointer-events-none" />
    </div>
  )
}
