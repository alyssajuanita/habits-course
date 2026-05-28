'use client'
import Link from 'next/link'
import { SESSIONS, STEPS } from '@/lib/sessions'
import { useProgress } from '@/lib/useProgress'

function ProgressRing({ completed, total }: { completed: number; total: number }) {
  const pct = total === 0 ? 0 : completed / total
  const r = 26
  const circ = 2 * Math.PI * r
  const dash = pct * circ
  const done = completed === total && total > 0

  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="rotate-[-90deg]">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#1e2d45" strokeWidth="6" />
      <circle
        cx="32" cy="32" r={r} fill="none"
        stroke={done ? '#22c55e' : '#14b8a6'}
        strokeWidth="6"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s ease' }}
      />
    </svg>
  )
}

function SessionCard({ session, completedSteps }: { session: typeof SESSIONS[0]; completedSteps: number }) {
  const total = STEPS.length
  const done = completedSteps === total
  const started = completedSteps > 0

  return (
    <Link href={`/session/${session.id}`} className="group block">
      <div className={`
        relative rounded-2xl border overflow-hidden transition-all duration-200
        ${done
          ? 'border-green-700/50 bg-gradient-to-br from-green-900/30 to-[#111827]'
          : 'border-slate-700/40 bg-[#111827] hover:border-teal-500/50 hover:bg-[#1a2438]'
        }
        group-hover:shadow-lg group-hover:shadow-teal-900/20 group-hover:-translate-y-0.5
      `}>
        {/* Session number badge */}
        <div className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full
          ${done ? 'bg-green-800/60 text-green-300' : 'bg-slate-700/60 text-slate-400'}`}>
          {done ? '✓ Complete' : started ? `${completedSteps}/${total}` : `Session ${session.id}`}
        </div>

        <div className="p-6 flex items-start gap-4">
          {/* Progress ring */}
          <div className="relative flex-shrink-0">
            <ProgressRing completed={completedSteps} total={total} />
            <span className="absolute inset-0 flex items-center justify-center text-xl rotate-90">
              {session.icon}
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="text-xs font-medium text-teal-400 uppercase tracking-widest mb-1">
              Session {session.id}
            </p>
            <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
              {session.title}
            </h3>
            <p className="text-sm text-slate-400 mt-2 line-clamp-2">{session.description}</p>

            {/* Step pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {STEPS.map(step => {
                const isComplete = completedSteps >= STEPS.indexOf(step) + 1
                return (
                  <span key={step.key}
                    className={`text-xs px-2 py-0.5 rounded-full border ${
                      isComplete
                        ? 'bg-teal-900/50 border-teal-600/50 text-teal-300'
                        : 'bg-slate-800/50 border-slate-600/30 text-slate-500'
                    }`}>
                    {step.icon} {step.label}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const { sessionProgress } = useProgress()

  const totalSteps = SESSIONS.length * STEPS.length
  const completedTotal = SESSIONS.reduce((sum, s) => sum + sessionProgress(s.id), 0)
  const overallPct = Math.round((completedTotal / totalSteps) * 100)

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Top nav */}
      <nav className="border-b border-slate-800/60 bg-[#0a0f1e]/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-teal-400 text-xl">⊕</span>
            <span className="font-semibold text-white text-sm tracking-wide">Habits of Replicating Disciples</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://app.mightynetworks.com" target="_blank" rel="noopener"
              className="text-sm text-slate-400 hover:text-teal-400 transition-colors hidden sm:block">
              DMM Community
            </a>
            <a href="#coaching" className="text-sm bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg transition-colors">
              Coaching Circles
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-950/30 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center relative">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full border-2 border-teal-500/40 bg-teal-950/30 flex items-center justify-center">
              <span className="text-3xl">⊕</span>
            </div>
          </div>

          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Mercy Alliance International
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Habits of<br className="sm:hidden" /> Replicating Disciples
          </h1>
          <p className="text-xl text-slate-300 font-medium mb-3">
            A 7-Week Journey to Becoming a Disciple Who Makes Disciples
          </p>
          <p className="text-slate-400 max-w-xl mx-auto mb-8">
            Transform how you pray, engage, and multiply — one habit at a time.
          </p>

          {/* Quote */}
          <blockquote className="max-w-2xl mx-auto bg-slate-800/40 border border-slate-700/40 rounded-xl p-6 text-left mb-10">
            <p className="text-slate-300 italic leading-relaxed">
              "Seven weeks. Seven habits. One mission. Everything we cover in this training flows from one simple truth:
              God wants a family, not just followers. Welcome to the journey."
            </p>
            <footer className="mt-3 text-teal-400 text-sm font-semibold">— Roy Moran, Mercy Alliance</footer>
          </blockquote>

          {/* Overall progress bar */}
          {completedTotal > 0 && (
            <div className="max-w-md mx-auto bg-slate-800/60 rounded-xl p-4 mb-8 border border-slate-700/40">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-teal-400 font-semibold">{overallPct}% complete</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-700"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{completedTotal} of {totalSteps} steps completed</p>
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/session/1"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-teal-900/30">
              {completedTotal > 0 ? '▶ Continue Your Journey' : '▶ Begin the Journey'}
            </Link>
            <a href="https://app.mightynetworks.com" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl border border-slate-700/50 transition-colors">
              🌐 Join Our DMM Community
            </a>
          </div>
        </div>
      </div>

      {/* Sessions grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Your 7-Week Journey</h2>
          <span className="text-sm text-slate-500">{SESSIONS.filter(s => sessionProgress(s.id) === STEPS.length).length} of 7 complete</span>
        </div>

        <div className="grid gap-4">
          {SESSIONS.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              completedSteps={sessionProgress(session.id)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer id="coaching" className="border-t border-slate-800/60 bg-[#0a0f1e]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Powered by Mercy Alliance</p>
          <div className="flex justify-center gap-6 text-sm mb-6">
            <a href="https://app.mightynetworks.com" target="_blank" rel="noopener"
              className="text-teal-400 hover:text-teal-300 transition-colors">DMM Community</a>
            <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">Coaching Circles</a>
            <a href="https://wa.me/" target="_blank" rel="noopener"
              className="text-teal-400 hover:text-teal-300 transition-colors">WhatsApp</a>
          </div>
          <p className="text-slate-600 text-xs">
            © 2025 Mercy Alliance. These materials are copyrighted so you know how you can freely use them.
          </p>
        </div>
      </footer>
    </div>
  )
}
