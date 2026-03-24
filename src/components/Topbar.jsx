import React from 'react'
export default function Topbar({ search, onSearch, doneCount, total, onAdd, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="logo">Scholar <span>— Smart Assignment Tracker</span></div>
      <div className="search-wrap">
        <span className="search-ic">⌕</span>
        <input type="text" placeholder="Search assignments…" value={search} onChange={e => onSearch(e.target.value)} />
      </div>
      <div className="topbar-right">
        <div className="pill"><span className="pill-num">{doneCount}</span> / {total} done</div>
        <button className="theme-btn" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀' : '☽'}
        </button>
        <button className="add-btn" onClick={onAdd}>+ Add Assignment</button>
      </div>
    </header>
  )
}
