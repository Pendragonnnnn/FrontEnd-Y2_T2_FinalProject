import { useState, useEffect } from 'react'
import { POMO_DURATIONS, playBeep } from '../utils/helpers'

export function usePomodoro() {
  const [mode, setModeRaw] = useState('work')
  const [timeLeft, setTimeLeft] = useState(POMO_DURATIONS.work)
  const [running, setRunning] = useState(false)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(id)
          setRunning(false)
          if (mode === 'work') setCycles(c => c + 1)
          playBeep()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, mode])

  const setMode = (m) => {
    setModeRaw(m)
    setTimeLeft(POMO_DURATIONS[m])
    setRunning(false)
  }

  const reset = () => {
    setTimeLeft(POMO_DURATIONS[mode])
    setRunning(false)
  }

  return { mode, setMode, timeLeft, running, setRunning, cycles, reset }
}
