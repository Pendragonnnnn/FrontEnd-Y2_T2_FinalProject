import React from 'react'
const NAV = [['list','≡','Assignments'],['calendar','▦','Calendar'],['stats','≈','Statistics']]
export default function Sidebar({ view, onView, rate, isPrem }) {
  return (
    <nav className="sidebar">
      <div className="sb-section">Views</div>
      {NAV.map(([id, icon, label]) => (
        <button key={id} className={`nav-btn ${view === id ? 'active' : ''}`} onClick={() => onView(id)}>
          <span className="nav-ic">{icon}</span>{label}
        </button>
      ))}
      <div className="sb-divider" />
      <div className="sb-section">Premium</div>
      <button className={`nav-btn ${view === 'premium' ? 'active' : ''}`} onClick={() => onView('premium')}>
        <span className="nav-ic">★</span>Premium
        {!isPrem && <span className="pro-badge">PRO</span>}
      </button>
      <div className="sb-divider" />
      <div className="sb-progress">
        <div className="sb-progress-label">Overall Progress</div>
        <div className="sb-bar"><div className="sb-bar-fill" style={{ width: `${rate}%` }} /></div>
        <div className="sb-pct">{rate}% complete</div>
      </div>
    </nav>
  )
}
