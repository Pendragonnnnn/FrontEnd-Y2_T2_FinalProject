import React, { useState } from 'react'
import { useAssignments } from './utils/useAssignments'
import { usePomodoro } from './utils/usePomodoro'
import { PREMIUM_KEY } from './utils/helpers'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import ListView from './components/ListView'
import CalendarView from './components/CalendarView'
import StatsView from './components/StatsView'
import AddModal from './components/AddModal'
import Pomodoro from './components/com-pomo/Pomodoro'

function loadPrem() {
  try { return JSON.parse(localStorage.getItem(PREMIUM_KEY) || 'false') } catch { return false }
}

export default function App() {
  const { assignments, addAssignment, updateAssignment, deleteAssignment, toggleComplete, updateProgress, attachFile } = useAssignments()
  const pomodoro = usePomodoro()

  const [view, setView]                 = useState('list')
  const [showModal, setShowModal]       = useState(false)
  const [editing, setEditing]           = useState(null)
  const [search, setSearch]             = useState('')
  const [filterSub, setFilterSub]       = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterDiff, setFilterDiff]     = useState('All')
  const [isPrem, setIsPrem]             = useState(loadPrem)
  const [calMonth, setCalMonth]         = useState(new Date())
  const [randomPick, setRandomPick]     = useState(null)
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.className = next === 'light' ? 'light' : ''
      return next
    })
  }

  
  const handleUnlockPrem = () => { setIsPrem(true); localStorage.setItem(PREMIUM_KEY, 'true') }
  const openAdd    = () => { setEditing(null); setShowModal(true) }
  const openEdit   = a  => { setEditing(a); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setEditing(null) }
  const handleSave = data => { editing ? updateAssignment(editing.id, data) : addAssignment(data); closeModal() }
  const pickRandom = () => {
    const pool = assignments.filter(a => !a.completed)
    if (pool.length) setRandomPick(pool[Math.floor(Math.random() * pool.length)])
  }

  const doneCount = assignments.filter(a => a.completed).length
  const total     = assignments.length
  const rate      = total > 0 ? Math.round((doneCount / total) * 100) : 0

  return (
    <div className="app">
      <Topbar search={search} onSearch={setSearch} doneCount={doneCount} total={total} onAdd={openAdd}  theme={theme} onToggleTheme={toggleTheme}/>
      <div className="body">
        <Sidebar view={view} onView={setView} rate={rate} isPrem={isPrem} />
        <main className="main">
          {view === 'list' && (
            <ListView
              assignments={assignments} search={search}
              filterSub={filterSub}       setFilterSub={setFilterSub}
              filterStatus={filterStatus} setFilterStatus={setFilterStatus}
              filterDiff={filterDiff}     setFilterDiff={setFilterDiff}
              onToggle={toggleComplete} onDelete={deleteAssignment}
              onEdit={openEdit} onProgress={updateProgress} onAttach={attachFile}
              doneCount={doneCount} total={total} rate={rate}
            />
          )}
          {view === 'calendar' && <CalendarView assignments={assignments} month={calMonth} onMonthChange={setCalMonth} />}
          {view === 'stats'    && <StatsView assignments={assignments} />}
          {view === 'premium'  && (
            <Pomodoro
            />
          )}
        </main>
      </div>
      {showModal && <AddModal initial={editing} onClose={closeModal} onSave={handleSave} />}
    </div>
  )
}
