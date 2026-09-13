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
      {/* Dynamic 3D WebGL Topology field with rotating glowing round lights */}
      {!reducedMotion && (
        <div className="w-full h-full">
          <TopologyField className="w-full h-full" brightness={1.25} />
        </div>
      )}

      {/* Top primary cyan ambient glow orb backup */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Dark vignette overlay for crisp readability */}
      <div className="absolute inset-0 bg-[#030712]/50 pointer-events-none" />
    </div>
  )
}

