import React from 'react'
import { getPriority, SUBJECTS as DEFAULT_SUBJECTS } from '../utils/helpers'
import { useSubjects } from '../utils/useSubjects'


function Donut({ pct, color, size = 130 }) {
  const r = 46
  const circ = 2 * Math.PI * r
  const dash = circ - (pct / 100) * circ

  return (
    <div className="sv-donut-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg)" strokeWidth={13} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash} transform={`rotate(-90 ${size/2} ${size/2})`} />
      </svg>
      <div className="sv-donut-center">
        <div className="sv-donut-pct" style={{ color }}>{pct}%</div>
        <div className="sv-donut-sub">done</div>
      </div>
    </div>
  )
}


export default function StatsView({ assignments }) {
  const total = assignments.length
  const done = assignments.filter(a => a.completed).length
  const active = total - done
  const rate = total ? Math.round((done / total) * 100) : 0
  const { subjects} = useSubjects()

  const subData = subjects.map(s => {
    const totalSub = assignments.filter(a => a.subject === s).length
    const doneSub = assignments.filter(a => a.subject === s && a.completed).length
    return { name: s, total: totalSub, done: doneSub }
  }).filter(d => d.total > 0)

  const diffCounts = {
    Easy: { total: assignments.filter(a => a.difficulty === 'Easy').length, done: assignments.filter(a => a.difficulty === 'Easy' && a.completed).length, color: '#34d399' },
    Medium: { total: assignments.filter(a => a.difficulty === 'Medium').length, done: assignments.filter(a => a.difficulty === 'Medium' && a.completed).length, color: '#fb923c' },
    Hard: { total: assignments.filter(a => a.difficulty === 'Hard').length, done: assignments.filter(a => a.difficulty === 'Hard' && a.completed).length, color: '#f43f5e' },
  }

  const prioCounts = {
    overdue: { label: 'Overdue', color: '#5b0202', bg: '#5b020220' },
    urgent: { label: 'Urgent', color: '#e44848', bg: '#e4484820' },
    upcoming: { label: 'Upcoming', color: '#fb923c', bg: '#fb923c20' },
    future: { label: 'Future', color: '#60a5fa', bg: '#60a5fa20' },
  }
  Object.keys(prioCounts).forEach(k => {
    prioCounts[k].count = assignments.filter(a => !a.completed && getPriority(a.dueDate, a.completed) === k).length
  })

 
  return (
    <div className="sv-wrap">
      <div className="sv-kpi-row">
        {[{val: total,lbl:'Total'},{val: done,lbl:'Completed'},{val: active,lbl:'Active'}].map(({val,lbl})=>(
          <div className="sv-kpi" key={lbl}>
            <div className="sv-kpi-val">{val}</div>
            <div className="sv-kpi-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <div className="sv-row">
        <div className="sv-card">
          <div className="sv-card-title">Completion Rate</div>
          <Donut pct={rate} color="#34d399" />
        </div>

        <div className="sv-card">
          <div className="sv-card-title">By Priority</div>
          <div className="sv-prio-grid">
            {Object.entries(prioCounts).map(([k,{label,color,bg,count}])=>(
              <div key={k} className="sv-prio-pill" style={{background:bg}}>
                <div className="sv-prio-name" style={{color}}>{label}</div>
                <div className="sv-prio-num" style={{color}}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sv-card">
        <div className="sv-card-title">Difficulty Breakdown</div>
        <div className="sv-diff-row">
          {Object.entries(diffCounts).map(([name,{total:t,color}])=>t>0 && <div key={name} className="sv-diff-seg" style={{flex:t,background:color}}>{t}</div>)}
        </div>
      </div>

      
      <div className="sv-card">
        <div className="sv-card-title">Assignments by Subject</div>
        {subData.map((d,i)=>{
          const pct = d.total? (d.done/d.total)*100:0
          const hue = (i*47)%360
          const color = `hsl(${hue},70%,60%)`
          return (
            <div className="sv-hbar-row" key={d.name}>
              <div className="sv-hbar-lbl" title={d.name}>{d.name}</div>
              <div className="sv-hbar-track">
                <div style={{height:'100%',width:'100%',background:'var(--border)',borderRadius:99}}>
                  <div className="sv-hbar-fill" style={{width:`${pct}%`,background:color}}/>
                </div>
              </div>
              <div className="sv-hbar-count">{d.done}/{d.total}</div>
            </div>
          )
        })}
      </div>

      
    </div>
  )
}