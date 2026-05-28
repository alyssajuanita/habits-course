import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'Habits of Replicating Disciples',
  description: 'A 7-Week Journey to Becoming a Disciple Who Makes Disciples',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="min-h-screen bg-[#0a0f1e] text-slate-100 antialiased">{children}</body></html>)
}