import React from 'react'
import { POMO_DURATIONS, DIFF_COLORS, PRIO_COLORS, getPriority, formatDate, formatTime } from '../utils/helpers'

const MODES = { work: 'Focus', short: 'Short Break', long: 'Long Break' }

function PomodoroCard({ mode, setMode, timeLeft, running, setRunning, cycles, onReset }) {
  const total = POMO_DURATIONS[mode]
  const pct   = Math.max(0, (timeLeft / total) * 100)
  const r     = 64, circ = 2 * Math.PI * r

  return (
    <div className="prem-card">
      <div className="prem-card-title">⏱ Pomodoro Timer</div>
      <div className="prem-card-sub">Stay in flow with timed sessions</div>

      <div className="pomo-modes">
        {Object.entries(MODES).map(([m, label]) => (
          <button key={m} className={`pomo-mode-btn ${mode === m ? 'active' : ''}`} onClick={() => setMode(m)}>{label}</button>
        ))}
      </div>

      <div className="pomo-ring">
        <svg width="148" height="148">
          <circle cx={74} cy={74} r={r} fill="none" stroke="var(--surface)" strokeWidth={7} />
          <circle cx={74} cy={74} r={r} fill="none" stroke="#daa84a" strokeWidth={7} strokeLinecap="round"
            strokeDasharray={String(circ)} strokeDashoffset={String(circ * (1 - pct / 100))}
            style={{ transition: 'stroke-dashoffset 1s linear', transform: 'rotate(-90deg)', transformOrigin: '74px 74px' }} />
        </svg>
        <div className="pomo-ring-inner">
          <div className="pomo-time">{formatTime(timeLeft)}</div>
          <div className="pomo-mode-label">{MODES[mode]}</div>
        </div>
      </div>

      <div className="pomo-ctrls">
        <button className="pomo-btn pomo-btn-start" onClick={() => setRunning(!running)}>{running ? '⏸ Pause' : '▶ Start'}</button>
        <button className="pomo-btn pomo-btn-reset" onClick={onReset}>↺ Reset</button>
      </div>
      <div className="pomo-cycles">🍅 {cycles} focus session{cycles !== 1 ? 's' : ''} today</div>
    </div>
  )
}

function RandomPickerCard({ assignments, pick, onPick }) {
  const active = assignments.filter(a => !a.completed)
  return (
    <div className="prem-card">
      <div className="prem-card-title">🎲 Random Assignment Picker</div>
      <div className="prem-card-sub">{active.length} active assignment{active.length !== 1 ? 's' : ''} in pool</div>

      {pick ? (
        <div className="random-result">
          <div className="random-title">{pick.title}</div>
          <div className="random-meta">
            <span className="random-sub-tag">{pick.subject}</span>
            <span style={{ color: DIFF_COLORS[pick.difficulty], fontSize: '11px', fontWeight: 600 }}>{pick.difficulty}</span>
            <span className="random-date">Due: {formatDate(pick.dueDate)}</span>
          </div>
          <div className="random-bar">
            <div className="random-bar-fill" style={{ width: `${pick.progress}%`, background: PRIO_COLORS[getPriority(pick.dueDate, false)] }} />
          </div>
          <div className="random-pct">{pick.progress}% complete</div>
        </div>
      ) : (
        <div className="random-empty">Hit the button to pick a random assignment</div>
      )}

      <button className="pick-btn" onClick={onPick} disabled={active.length === 0}>
        {active.length === 0 ? '🎉 All assignments done!' : '🎲 Pick Random Assignment'}
      </button>

      {active.length > 0 && (
        <div className="pool">
          <div className="pool-label">Active Pool</div>
          {active.map(a => (
            <div key={a.id} className="pool-item">
              <span className="pool-item-title">{a.title}</span>
              <span style={{ color: DIFF_COLORS[a.difficulty], fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>{a.difficulty}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PremiumView({ isPrem, onUnlock, assignments, mode, setMode, timeLeft, running, setRunning, cycles, onReset, pick, onPick }) {
  if (!isPrem) {
    return (
      <div className="prem-gate">
        <div style={{ fontSize: '44px', marginBottom: '14px' }}>★</div>
        <h2>Unlock Premium Features</h2>
        <p>Supercharge your study sessions with powerful productivity tools.</p>
        <div className="feat-grid">
          {[
            ['⏱ Pomodoro Timer',  '25-min focus sessions with break reminders'],
            ['🎲 Random Picker',  'Let the app decide what to tackle next'],
            ['🔔 Session Alerts', 'Audio cue when a session completes'],
            ['📊 Cycle Tracking', 'Track your daily focus sessions'],
          ].map(([t, d]) => (
            <div key={t} className="feat-item"><b>{t}</b><span>{d}</span></div>
          ))}
        </div>
        <button className="unlock-btn" onClick={onUnlock}>✦ Unlock Premium – Free</button>
      </div>
    )
  }
  return (
    <div className="prem-content">
      <PomodoroCard mode={mode} setMode={setMode} timeLeft={timeLeft} running={running} setRunning={setRunning} cycles={cycles} onReset={onReset} />
      <RandomPickerCard assignments={assignments} pick={pick} onPick={onPick} />
    </div>
  )
}
