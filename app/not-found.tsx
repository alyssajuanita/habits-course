import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center text-center px-4">
      <span className="text-5xl mb-4">🔍</span>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-slate-400 mb-6">This session doesn't exist yet.</p>
      <Link href="/" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">← Back to Dashboard</Link>
    </div>
  )
}