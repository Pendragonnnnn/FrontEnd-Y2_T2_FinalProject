import React from 'react'
import { SUBJECTS, getPriority } from '../utils/helpers'

export default function StatsView({ assignments }) {
  const total     = assignments.length
  const doneCount = assignments.filter(a => a.completed).length
  const rate      = total > 0 ? Math.round((doneCount / total) * 100) : 0

  const subData = SUBJECTS.map(s => ({
    name:  s,
    total: assignments.filter(a => a.subject === s).length,
    done:  assignments.filter(a => a.subject === s && a.completed).length,
  })).filter(d => d.total > 0)



  return (
    <div className="stats-wrap">
      <div className="stats-grid">
        {[
          [total,      'Total',           'var(--text)'],
          [doneCount,  'Completed',       '#34d399'],
          [rate + '%', 'Completion Rate', '#daa84a'],
        ].map(([val, label, color]) => (
          <div key={label} className="stat-card">
            <div className="stat-val" style={{ color }}>{val}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="chart-card">
        <div className="chart-title">Assignments by Subject</div>
        {subData.length === 0 
        ? (
          <div className="chart-empty">Add assignments to see data</div>
        ) 
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {subData.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                <span style={{ width: '100px', color: 'var(--muted)', flexShrink: 0 }}>
                  {d.name}
                  </span>
                <div style={{ flex: 1, height: '10px', background: 'var(--surface)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${100}%`, background: 'var(--border-hov)', borderRadius: '5px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${d.total > 0 ? (d.done / d.total) * 100 : 0}%`, background: '#34d399', borderRadius: '5px' }} />
                  </div>
                </div>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'var(--muted)', width: '36px', textAlign: 'right' }}>
                  {d.done}/{d.total}
                  </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
