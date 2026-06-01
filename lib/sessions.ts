export type StepKey = 'watch' | 'keyIdeas' | 'reflect' | 'scripture' | 'action'

export interface Step {
  key: StepKey
  label: string
  icon: string
  durationLabel: string
}

export interface Session {
  id: number
  slug: string
  title: string
  subtitle: string
  icon: string
  color: string
  videoUrl: string
  videoDuration: string
  description: string
  keyIdeas: string[]
  reflectQuestions: string[]
  scripture: { reference: string; text: string }
  actionPrompt: string
  resources?: { label: string; url: string }[]
}

export const STEPS: Step[] = [
  { key: 'watch',     label: 'Watch the Session', icon: '▶',  durationLabel: '~60 min' },
  { key: 'keyIdeas',  label: 'Key Ideas',          icon: '💡', durationLabel: '5 min'   },
  { key: 'reflect',   label: 'Reflect',            icon: '✍',  durationLabel: '5 min'   },
  { key: 'scripture', label: 'Scripture Study',    icon: '📖', durationLabel: '5 min'   },
  { key: 'action',    label: 'Your Action',        icon: '🎯', durationLabel: '5 min'   },
]

export const SESSIONS: Session[] = [
  {
    id: 1,
    slug: '1',
    title: 'The Heart of the Father',
    subtitle: 'Habits of Replicating Disciples',
    icon: '❤️',
    color: 'from-rose-700 to-rose-900',
    videoUrl: 'https://www.youtube.com/embed/YcbH5HAdCKM',
    videoDuration: '1:01:52',
