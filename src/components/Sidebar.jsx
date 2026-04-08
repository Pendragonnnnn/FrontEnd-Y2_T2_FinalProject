import React from 'react'
const NAV = [['list','≡','Assignments'],['calendar','▦','Calendar'],['stats','≈','Statistics']]
export default function Sidebar({ view, onView, rate, isOpen, onClose }) {
  return (
    
    <nav className="sidebar"
    style={{
          transform: isOpen ? 'translateX(0)' : '',
          transition: 'transform 0.3s ease',
          zIndex: 50,
          // display: isOpen ? 'block' : 'none'
        }}>
      <button className = "!ml-auto !px-5  cursor-pointer hover:font-bold hover:round-xl md:!px-2" id = "close-sidebar" onClick = { () => onClose( )}>
        <i className={`fa-solid fa-xmark !p-1 text-xl hover:font-bold `} ></i></button>
      <div className="sb-section">Views</div>
      {NAV.map(([id, icon, label]) => (
        <button key={id} className={`nav-btn ${view === id ? 'active' : ''}`} onClick={() => onView(id)}>
          <span className="nav-ic">{icon}</span>{label}
        </button>
      ))}
      <div className="sb-divider" />
      <div className="sb-section">Pomodoro</div>
      <button className={`nav-btn ${view === 'pomodoro' ? 'active' : ''}`} onClick={() => onView('pomodoro')}>
        <span className="nav-ic">★</span>Pomodoro Mode     </button>
      <div className="sb-divider" />
      <div className="sb-progress">
        <div className="sb-progress-label">Overall Progress</div>
        <div className="sb-bar"><div className="sb-bar-fill" style={{ width: `${rate}%` }} /></div>
        <div className="sb-pct">{rate}% complete</div>
      </div>
    </nav>
  )
}
