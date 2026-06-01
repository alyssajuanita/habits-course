'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SESSIONS, STEPS, type StepKey } from '@/lib/sessions'
import { useProgress } from '@/lib/useProgress'

/* ─── Step Content Components ─── */

function WatchStep({ session }: { session: typeof SESSIONS[0] }) {
  return (
    <div className="step-content space-y-6">
      <div>
        <p className="text-slate-300 leading-relaxed text-lg">{session.description}</p>
      </div>

      {/* Video embed placeholder */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800/80 border border-slate-700/50 flex flex-col items-center justify-center group cursor-pointer">
        {session.videoUrl ? (
          <iframe
            src={session.videoUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center mb-3">
              <span className="text-3xl ml-1">▶</span>
            </div>
            <p className="text-slate-400 text-sm">Video coming soon</p>
            <p className="text-slate-500 text-xs mt-1">{session.videoDuration}</p>
          </>
        )}
      </div>

      {/* Resources */}
      {session.resources && session.resources.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {session.resources.map(r => (
            <a key={r.label} href={r.url} target="_blank" rel="noopener"
              className="text-sm text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors">
              📎 {r.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function KeyIdeasStep({ session }: { session: typeof SESSIONS[0] }) {
  return (
    <div className="step-content space-y-4">
      <p className="text-slate-400 text-sm">The core ideas from this session:</p>
      <ul className="space-y-3">
        {session.keyIdeas.map((idea, i) => (
          <li key={i} className="flex gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600/20 border border-teal-500/30 text-teal-400 text-xs flex items-center justify-center font-bold">
              {i + 1}
            </span>
            <p className="text-slate-200 leading-relaxed">{idea}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReflectStep({ session }: { session: typeof SESSIONS[0] }) {
  const [answers, setAnswers] = useState<string[]>(() => session.reflectQuestions.map(() => ''))

  // Load saved answers
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`reflect-${session.id}`)
      if (saved) setAnswers(JSON.parse(saved))
    } catch {}
  }, [session.id])

  const update = (i: number, val: string) => {
    setAnswers(prev => {
      const next = [...prev]
      next[i] = val
      try { localStorage.setItem(`reflect-${session.id}`, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <div className="step-content space-y-6">
      <p className="text-slate-400 text-sm">Take a few minutes to reflect. Your answers are saved locally on your device.</p>
      {session.reflectQuestions.map((q, i) => (
        <div key={i} className="space-y-2">
          <label className="block text-slate-200 font-medium leading-relaxed">
            <span className="text-teal-400 mr-2">{i + 1}.</span>{q}
          </label>
          <textarea
            value={answers[i]}
            onChange={e => update(i, e.target.value)}
            rows={4}
            placeholder="Write your thoughts here…"
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 resize-none transition-colors text-sm leading-relaxed"
          />
        </div>
      ))}
    </div>
  )
}

function ScriptureStep({ session }: { session: typeof SESSIONS[0] }) {
  const dbs = [
    'What does this passage say? (Summarize in your own words)',
    'What does it tell us about God or Jesus?',
    'What does it tell us about people?',
    'If this is true, what will you do about it?',
    'Who will you share this with this week?',
  ]
  const [answers, setAnswers] = useState<string[]>(() => dbs.map(() => ''))

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`scripture-${session.id}`)
      if (saved) setAnswers(JSON.parse(saved))
    } catch {}
  }, [session.id])

  const update = (i: number, val: string) => {
    setAnswers(prev => {
      const next = [...prev]
      next[i] = val
      try { localStorage.setItem(`scripture-${session.id}`, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <div className="step-content space-y-6">
      {/* Scripture passage */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/30">
        <p className="text-teal-400 text-sm font-semibold mb-3">{session.scripture.reference}</p>
        <p className="scripture-block text-slate-300 leading-relaxed">{session.scripture.text}</p>
      </div>

      {/* Discovery Bible Study questions */}
      <div>
        <h3 className="text-white font-semibold mb-1">Discovery Bible Study</h3>
        <p className="text-slate-500 text-sm mb-4">Work through these questions with the passage above.</p>
        <div className="space-y-4">
          {dbs.map((q, i) => (
            <div key={i} className="space-y-2">
              <label className="block text-slate-300 text-sm font-medium">
                <span className="text-teal-500 mr-2">{i + 1}.</span>{q}
              </label>
              <textarea
                value={answers[i]}
                onChange={e => update(i, e.target.value)}
                rows={3}
                placeholder="Your answer…"
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 resize-none transition-colors text-sm leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ActionStep({ session }: { session: typeof SESSIONS[0] }) {
  const [committed, setCommitted] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`action-${session.id}`)
      if (saved) {
        const { committed: c, note: n } = JSON.parse(saved)
        setCommitted(c)
        setNote(n)
      }
    } catch {}
  }, [session.id])

  const save = (c: boolean, n: string) => {
    try { localStorage.setItem(`action-${session.id}`, JSON.stringify({ committed: c, note: n })) } catch {}
  }

  return (
    <div className="step-content space-y-6">
      <div className="bg-gradient-to-br from-teal-900/30 to-slate-800/50 rounded-xl p-6 border border-teal-700/30">
        <div className="flex gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <div>
            <h3 className="text-white font-semibold text-lg">This Week's Action</h3>
            <p className="text-slate-400 text-sm">Put it into practice</p>
          </div>
        </div>
        <p className="text-slate-200 leading-relaxed">{session.actionPrompt}</p>
      </div>

      {/* Commitment */}
      <div className="space-y-3">
        <button
          onClick={() => { setCommitted(!committed); save(!committed, note) }}
          className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl border transition-all font-medium ${
            committed
              ? 'bg-green-900/30 border-green-600/40 text-green-300'
              : 'bg-slate-800/50 border-slate-700/40 text-slate-300 hover:border-teal-500/40 hover:text-white'
          }`}>
          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            committed ? 'border-green-400 bg-green-500/20' : 'border-slate-600'
          }`}>
            {committed && <span className="text-green-400 text-sm">✓</span>}
          </span>
          {committed ? "I'm committed to this action this week!" : "Click to commit to this action"}
        </button>

        <textarea
          value={note}
          onChange={e => { setNote(e.target.value); save(committed, e.target.value) }}
          rows={3}
          placeholder="Add any notes about your specific plan…"
          className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30 resize-none transition-colors text-sm leading-relaxed"
        />
      </div>

      {/* Share in community */}
      <div className="bg-slate-800/40 rounded-xl p-5 border border-slate-700/30 flex items-center justify-between gap-4">
        <div>
          <p className="text-white font-medium text-sm">Share in the DMM Community</p>
          <p className="text-slate-500 text-xs mt-0.5">Accountability + encouragement from the cohort</p>
        </div>
        <a href="https://network-10376509.mn.co/share/4ly4JW4EoMcWX-J-?utm_source=manual" target="_blank" rel="noopener"
          className="flex-shrink-0 bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          Share →
        </a>
      </div>
    </div>
  )
}

/* ─── Main Session Page ─── */

export default function SessionPage({ params }: { params: { id: string } }) {
  const sessionId = parseInt(params.id, 10)
  const session = SESSIONS.find(s => s.id === sessionId)
  if (!session) notFound()

  const { markComplete, markIncomplete, isComplete, sessionProgress } = useProgress()
  const [activeStep, setActiveStep] = useState<StepKey>('watch')

  const currentStepIdx = STEPS.findIndex(s => s.key === activeStep)
  const completedCount = sessionProgress(session.id)

  const goNext = () => {
    const next = STEPS[currentStepIdx + 1]
    if (next) setActiveStep(next.key)
  }
  const goPrev = () => {
    const prev = STEPS[currentStepIdx - 1]
    if (prev) setActiveStep(prev.key)
  }

  const toggleStep = () => {
    if (isComplete(session.id, activeStep)) {
      markIncomplete(session.id, activeStep)
    } else {
      markComplete(session.id, activeStep)
    }
  }

  const prevSession = SESSIONS.find(s => s.id === session.id - 1)
  const nextSession = SESSIONS.find(s => s.id === session.id + 1)

  const stepContent: Record<StepKey, React.ReactNode> = {
    watch:     <WatchStep session={session} />,
    keyIdeas:  <KeyIdeasStep session={session} />,
    reflect:   <ReflectStep session={session} />,
    scripture: <ScriptureStep session={session} />,
    action:    <ActionStep session={session} />,
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col">
      {/* Top nav */}
      <nav className="border-b border-slate-800/60 bg-[#0a0f1e]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors text-sm">
            ← <span className="hidden sm:inline">Habits of Replicating Disciples</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <a href="https://network-10376509.mn.co/share/4ly4JW4EoMcWX-J-?utm_source=manual" target="_blank" rel="noopener"
              className="text-sm text-slate-500 hover:text-teal-400 transition-colors hidden sm:block">
              DMM Community
            </a>
            <a href="https://mercyalliance.org/coaching-circle-registration/" target="_blank" rel="noopener"
              className="text-sm bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg transition-colors">
              Coaching Circles
            </a>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-2">
            {/* Session info */}
            <div className={`rounded-xl p-4 bg-gradient-to-br ${session.color} border border-white/10 mb-4`}>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                {session.subtitle}
              </p>
              <h2 className="text-white font-bold text-lg leading-snug">{session.title}</h2>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span>Progress</span>
                  <span>{completedCount} of {STEPS.length}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/60 rounded-full transition-all duration-500"
                    style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Steps nav */}
            {STEPS.map((step, i) => {
              const done = isComplete(session.id, step.key)
              const active = activeStep === step.key
              return (
                <button key={step.key} onClick={() => setActiveStep(step.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-sm ${
                    active
                      ? 'bg-teal-600/20 border border-teal-500/30 text-teal-300'
                      : done
                      ? 'text-slate-400 hover:bg-slate-800/50'
                      : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'
                  }`}>
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 text-xs transition-colors ${
                    done
                      ? 'border-teal-500 bg-teal-500/20 text-teal-400'
                      : active
                      ? 'border-teal-500/60 text-teal-400'
                      : 'border-slate-600 text-slate-600'
                  }`}>
                    {done ? '✓' : i + 1}
                  </span>
                  <div>
                    <p className="font-medium leading-tight">{step.label}</p>
                    <p className="text-xs text-slate-600">{step.durationLabel}</p>
                  </div>
                </button>
              )
            })}

            {/* Session nav */}
            <div className="pt-4 border-t border-slate-800/60 mt-4 space-y-2">
              {prevSession && (
                <Link href={`/session/${prevSession.id}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors">
                  ← {prevSession.title}
                </Link>
              )}
              {nextSession && (
                <Link href={`/session/${nextSession.id}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors">
                  {nextSession.title} →
                </Link>
              )}
            </div>

            {/* Community links */}
            <div className="pt-4 border-t border-slate-800/60 space-y-2">
              <a href="https://network-10376509.mn.co/share/4ly4JW4EoMcWX-J-?utm_source=manual" target="_blank" rel="noopener"
                className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                🌐 DMM Community
              </a>
              <a href="https://mercyalliance.org/coaching-circle-registration/" target="_blank" rel="noopener"
                className="flex items-center gap-2 text-sm text-teal-400 hover:text-teal-300 transition-colors">
                ⭕ Coaching Circles
              </a>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile: session header */}
          <div className={`lg:hidden rounded-xl p-4 bg-gradient-to-br ${session.color} border border-white/10 mb-4`}>
            <p className="text-white/60 text-xs uppercase tracking-widest">{session.subtitle}</p>
            <h2 className="text-white font-bold text-xl mt-0.5">{session.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white/60 rounded-full" style={{ width: `${(completedCount / STEPS.length) * 100}%` }} />
              </div>
              <span className="text-white/60 text-xs">{completedCount}/{STEPS.length}</span>
            </div>
          </div>

          {/* Mobile: step tabs */}
          <div className="lg:hidden flex gap-1 mb-4 overflow-x-auto pb-1">
            {STEPS.map((step, i) => {
              const done = isComplete(session.id, step.key)
              const active = activeStep === step.key
              return (
                <button key={step.key} onClick={() => setActiveStep(step.key)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    active ? 'bg-teal-600/20 text-teal-300 border border-teal-500/30'
                    : done ? 'bg-slate-800/60 text-slate-400 border border-slate-700/30'
                    : 'bg-slate-800/40 text-slate-600 border border-transparent'
                  }`}>
                  <span>{done ? '✓' : i + 1}</span>
                  <span>{step.label}</span>
                </button>
              )
            })}
          </div>

          {/* Step content card */}
          <div className="bg-[#111827] rounded-2xl border border-slate-700/40 overflow-hidden">
            {/* Step header */}
            <div className="px-6 py-5 border-b border-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{STEPS[currentStepIdx].icon}</span>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    Step {currentStepIdx + 1} of {STEPS.length}
                  </p>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {STEPS[currentStepIdx].label}
                  </h3>
                </div>
              </div>

              <button onClick={toggleStep}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isComplete(session.id, activeStep)
                    ? 'bg-green-900/40 border border-green-600/40 text-green-300 hover:bg-green-900/60'
                    : 'bg-slate-700/50 border border-slate-600/40 text-slate-300 hover:border-teal-500/40 hover:text-teal-300'
                }`}>
                {isComplete(session.id, activeStep) ? '✓ Done' : 'Mark Done'}
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              {stepContent[activeStep]}
            </div>

            {/* Navigation */}
            <div className="px-6 py-5 border-t border-slate-700/40 flex items-center justify-between">
              <button onClick={goPrev} disabled={currentStepIdx === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                ← Previous
              </button>

              {currentStepIdx < STEPS.length - 1 ? (
                <button onClick={() => { markComplete(session.id, activeStep); goNext() }}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
                  Mark Done & Next →
                </button>
              ) : nextSession ? (
                <Link href={`/session/${nextSession.id}`}
                  onClick={() => markComplete(session.id, activeStep)}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
                  Complete & Next Session →
                </Link>
              ) : (
                <Link href="/"
                  onClick={() => markComplete(session.id, activeStep)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
                  🎉 Complete Course!
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-sm">Powered by Mercy Alliance</p>
          <div className="flex gap-5 text-sm">
            <a href="https://network-10376509.mn.co/share/4ly4JW4EoMcWX-J-?utm_source=manual" target="_blank" rel="noopener"
              className="text-teal-500 hover:text-teal-400 transition-colors">DMM Community</a>
            <a href="https://mercyalliance.org/coaching-circle-registration/" target="_blank" rel="noopener"
              className="text-teal-500 hover:text-teal-400 transition-colors">Coaching Circles</a>
            <a href="https://wa.me/" target="_blank" rel="noopener"
              className="text-teal-500 hover:text-teal-400 transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
