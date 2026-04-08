export const SUBJECTS = []

export const DIFF_COLORS = {
  Easy: '#34d399',
  Medium: '#fb923c',
  Hard: '#f43f5e',
}

export const PRIO_COLORS = {
  urgent: '#e44848',
  upcoming: '#fb923c',
  future: '#60a5fa',
  completed: '#34d399',
  overdue: '#5b0202',
}

export const POMO_DURATIONS = {
  work: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
}

export const STORAGE_KEY = 'scholar_v2'
export const PREMIUM_KEY = 'scholar_prem_v2'

export function getPriority(dueDate, completed) {
  if (completed) return 'completed'
  const days = Math.ceil((new Date(dueDate) - Date.now()) / 86400000)
  if (days < 0) return 'overdue'
  if (days <= 2) return 'urgent'
  if (days <= 7) return 'upcoming'
  return 'future'
}

export function countdownText(dueDate, completed) {
  if (completed) return '✓ Completed'
  const ms = new Date(dueDate) - Date.now()
  if (ms < 0) {
    const d = Math.floor(-ms / 86400000)
    return d > 0 ? `${d}d overdue` : 'Due today'
  }
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  if (d > 1) return `${d}d ${h}h left`
  if (d === 1) return `1d ${h}h left`
  if (h > 0) return `${h}h ${m}m left`
  return `${m}m left`
}

export function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export function playBeep() {
  try {
    const ctx = new AudioContext()
    const o = ctx.createOscillator()
    o.connect(ctx.destination)
    o.frequency.value = 660
    o.start()
    setTimeout(() => { o.stop(); ctx.close() }, 400)
  } catch {}
}