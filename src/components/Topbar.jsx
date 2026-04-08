import React from 'react'
export default function Topbar({ search, onSearch, onAdd, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <div className="logo">Scholar <span>— Smart Assignment Tracker</span></div>
      <div className="search-wrap">
        <span className="search-ic">⌕</span>
        <input type="text" placeholder="Search assignments…" value={search} onChange={e => onSearch(e.target.value)} />
      </div>
      <div className="topbar-right">
        <button className="theme-btn" onClick={onToggleTheme}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <button className="add-btn" onClick={onAdd}>+ Add Assignment</button>
      </div>
    </header>
  )
}
