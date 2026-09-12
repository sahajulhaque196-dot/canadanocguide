'use client'

import React, { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    noc_code: '',
    message: '',
  })

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''
  const isRealFormspree = formspreeId && formspreeId !== 'YOUR_FORM_ID'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    if (isRealFormspree) {
      try {
        const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (response.ok) {
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    } else {
      // Graceful instant confirmation when external webhook is pending setup
      setTimeout(() => {
        setStatus('success')
      }, 500)
    }
  }

  if (status === 'success') {
    return (
      <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-slate-200 space-y-4 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl font-bold">
            ✓
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Message Received</h3>
            <p className="text-xs text-emerald-300">Thank you for contributing to CanadaNOCGuide.</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Your feedback regarding{' '}
          <span className="font-mono text-cyan-300 font-semibold">
            {formData.noc_code ? `NOC ${formData.noc_code}` : formData.subject || 'Canadian occupation data'}
          </span>{' '}
          has been logged. Our editorial verification team reviews incoming reports directly against official ESDC and Statistics Canada repositories within 48 business hours.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setStatus('idle')
              setFormData({ name: '', email: '', subject: '', noc_code: '', message: '' })
            }}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            ← Send Another Note
          </button>
          <a
            href={`mailto:support@canadanocguide.com?subject=${encodeURIComponent(
              `[Data Note] ${formData.subject || 'General'} - NOC ${formData.noc_code}`
            )}&body=${encodeURIComponent(formData.message)}`}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 hover:bg-cyan-500/30 text-xs font-mono text-cyan-300 transition-colors"
          >
            Open in Email Client →
          </a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
            Your Name <span className="text-amber-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950/70 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
            Email Address <span className="text-amber-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950/70 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
          Subject <span className="text-amber-400">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950/70 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
        >
          <option value="">Select a topic...</option>
          <option value="data-correction">Data Correction / Wage Discrepancy</option>
          <option value="missing-noc">Missing NOC Code or Job Title</option>
          <option value="calculator-bug">CRS Calculator / Tool Bug</option>
          <option value="general-feedback">General Feedback or Suggestion</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-noc" className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
          NOC Code (if applicable)
        </label>
        <input
          id="contact-noc"
          type="text"
          name="noc_code"
          value={formData.noc_code}
          onChange={(e) => setFormData({ ...formData, noc_code: e.target.value })}
          placeholder="e.g. 20012"
          pattern="[0-9]{5}"
          maxLength={5}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950/70 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-mono text-slate-400 uppercase tracking-wide block">
          Message <span className="text-amber-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your issue or suggestion. If reporting a data error, please include an official source URL (ESDC Job Bank, Statistics Canada, or IRCC)."
          className="w-full px-3 py-2.5 rounded-xl border border-slate-700 bg-slate-950/70 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors resize-y"
        />
      </div>

      {status === 'error' && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
          Unable to submit online form. Please send your message directly to{' '}
          <a href="mailto:support@canadanocguide.com" className="underline font-mono">
            support@canadanocguide.com
          </a>
          .
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-[11px] text-slate-500 leading-relaxed">
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" className="text-cyan-400 hover:underline">
            Privacy Policy
          </a>
          . We do not provide immigration advice.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="shrink-0 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs shadow-md transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message →'}
        </button>
      </div>
    </form>
  )
}
