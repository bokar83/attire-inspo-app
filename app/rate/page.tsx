'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UploadZone from '@/components/UploadZone'
import ResultBox from '@/components/ResultBox'
import PageTransition from '@/components/PageTransition'
import { analyzeOutfit } from '@/lib/api'

export default function RateMyFitPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [occasion, setOccasion] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  function handleFile(f: File) {
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleSubmit() {
    if (!file) return
    setLoading(true)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      if (occasion) fd.append('occasion', occasion)
      const res = await analyzeOutfit(fd)
      setResult(res.feedback)
    } catch {
      setResult('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
    <div className="pt-6 pb-28 px-4">
      <h1 className="font-syne text-2xl font-bold text-[#f0eaff]">Rate My Fit 🔥</h1>
      <p className="text-sm text-[#f0eaff]/50 mt-1 mb-6">
        Upload your outfit and get an honest AI critique
      </p>

      <UploadZone onFile={handleFile} preview={preview} />

      <div className="mt-4">
        <label className="block text-xs text-[#f0eaff]/50 mb-1">
          What&apos;s the occasion?
        </label>
        <input
          type="text"
          value={occasion}
          onChange={e => setOccasion(e.target.value)}
          placeholder="Job interview, date night, casual day…"
          className="w-full rounded-xl bg-white/[0.06] border border-white/10 px-4 py-3 text-[#f0eaff] placeholder:text-[#f0eaff]/30 outline-none focus:border-[#c77dff]/50 text-sm font-inter"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        disabled={loading || !file}
        className="mt-5 w-full bg-gradient-to-r from-[#c77dff] to-[#ff85a1] text-[#080610] font-semibold font-syne rounded-2xl py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Get My Rating ✨
      </motion.button>

      <AnimatePresence>
        {(result !== null || loading) && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6"
          >
            <ResultBox loading={loading} content={result ?? ''} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </PageTransition>
  )
}
