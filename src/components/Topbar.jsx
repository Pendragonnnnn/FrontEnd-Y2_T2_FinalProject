import React from 'react'
export default function Topbar({ search, onSearch, onAdd, theme, onToggleTheme, onMenu }) {
  return (
    <header className="topbar">
      <i className="fa-solid fa-bars cursor-pointer text-xl " id = "hamburger-btn"  onClick={() => onMenu()}></i>
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
