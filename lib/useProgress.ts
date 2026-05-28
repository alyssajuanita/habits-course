'use client'
import { useState, useEffect, useCallback } from 'react'
import type { StepKey } from './sessions'

type ProgressMap = Record<number, Set<StepKey>>
const STORAGE_KEY = 'habits-progress-v1'

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: Record<number, StepKey[]> = JSON.parse(raw)
    const map: ProgressMap = {}
    for (const [k, v] of Object.entries(parsed)) { map[Number(k)] = new Set(v) }
    return map
  } catch { return {} }
}

function saveProgress(map: ProgressMap) {
  const obj: Record<number, StepKey[]> = {}
  for (const [k, v] of Object.entries(map)) { obj[Number(k)] = Array.from(v) }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({})
  useEffect(() => { setProgress(loadProgress()) }, [])
  const markComplete = useCallback((sessionId: number, step: StepKey) => {
    setProgress(prev => { const next = {...prev}; if (!next[sessionId]) next[sessionId] = new Set(); next[sessionId] = new Set(next[sessionId]); next[sessionId].add(step); saveProgress(next); return next })
  }, [])
  const markIncomplete = useCallback((sessionId: number, step: StepKey) => {
    setProgress(prev => { const next = {...prev}; if (!next[sessionId]) return prev; next[sessionId] = new Set(next[sessionId]); next[sessionId].delete(step); saveProgress(next); return next })
  }, [])
  const isComplete = useCallback((sessionId: number, step: StepKey) => progress[sessionId]?.has(step) ?? false, [progress])
  const sessionProgress = useCallback((sessionId: number): number => progress[sessionId]?.size ?? 0, [progress])
  const resetAll = useCallback(() => { setProgress({}); localStorage.removeItem(STORAGE_KEY) }, [])
  return { markComplete, markIncomplete, isComplete, sessionProgress, resetAll }
}