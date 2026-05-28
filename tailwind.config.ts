import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { navy: { 900:'#0a0f1e',800:'#111827',700:'#1a2438',600:'#1e2d45' }, teal: { 400:'#2dd4bf',500:'#14b8a6',600:'#0d9488' }, gold: { 400:'#fbbf24',500:'#f59e0b' } } } },
  plugins: [],
}
export default config