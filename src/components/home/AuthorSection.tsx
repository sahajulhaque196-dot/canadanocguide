'use client'

import React from 'react'
import Image from 'next/image'

export default function AuthorSection() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto">
        
        {/* Author Card */}
        <div className="relative p-7 sm:p-10 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-900/60 shadow-2xl backdrop-blur-xl overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Author Portrait */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] relative bg-slate-900">
                <Image
                  src="/sahajul-haque.jpg"
                  alt="Sahajul Haque - Creator of CanadaNOCGuide"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 128px, 144px"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[10px] font-mono text-cyan-400 font-bold shadow-md">
                CREATOR
              </div>
            </div>

            {/* Author Info & Story */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 text-xs font-mono mb-2">
                  <span>Assam, India</span>
                  <span>🇮🇳</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Sahajul Haque
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  Creator of CanadaNOCGuide
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Hi, I&apos;m Sahajul from Assam, India. When I first started researching Canadian immigration, I found the whole system confusing. Official websites were full of hard-to-understand words, and private agencies were charging high fees just to share basic information.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                I built <strong className="text-white font-semibold">CanadaNOCGuide</strong> to make this simple for everyone. I took official Canadian government open data—all 516 NOC codes, 40,000 job titles, real wage reports, and Express Entry draws—and organized it into a clean, easy-to-use, and completely free guide.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                100% free open data, no paywalls, and no immigration agency sales pitches. Just clear, honest information to help you plan your journey to Canada.
              </p>

              {/* Social & Verification Pills */}
              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://x.com/saddamh58509953"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition-all duration-200 hover:border-cyan-500/50 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Connect with me on X (@saddamh58509953)</span>
                </a>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>100% Free &amp; Open Data</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
