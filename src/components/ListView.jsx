import React from 'react'
import AssignmentCard from './AssignmentCard'
import { getPriority, SUBJECTS as DEFAULT_SUBJECTS } from '../utils/helpers'
import { useSubjects } from '../utils/useSubjects'

export default function ListView({
  assignments, search,
  filterSub, setFilterSub, filterStatus, setFilterStatus, filterDiff, setFilterDiff,
  onToggle, onDelete, onEdit, onProgress
}) {
  const { subjects } = useSubjects()
  const total     = assignments.length
  const doneCount = assignments.filter(a => a.completed).length
  const rate      = total > 0 ? Math.round((doneCount / total) * 100) : 0

  const q = search.toLowerCase()
  const filtered = assignments
    .filter(a => {
      if (q && !a.title.toLowerCase().includes(q) && !a.subject.toLowerCase().includes(q)) return false
      if (filterSub    !== 'All' && a.subject    !== filterSub)  return false
      if (filterDiff   !== 'All' && a.difficulty !== filterDiff) return false
      if (filterStatus === 'Completed' && !a.completed)          return false
      if (filterStatus === 'Active'    &&  a.completed)          return false
      if (filterStatus === 'Urgent') {
        const p = getPriority(a.dueDate, a.completed)
        if (p !== 'urgent' && p !== 'overdue') return false
      }
      return true
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

  return (
    <div className="list-wrap">

      {/* --- Overall Progress --- */}
      <div className="progress-overview">
        <span className="progress-label">Overall Progress</span>
        <div className="prog-bar">
        <div className="prog-bar-fill" style={{ width: `${rate}%` }}></div>
      </div>
      <div className="prog-txt">{doneCount} / {total} done</div>
      </div>

      {/* --- Filter Bar --- */}
      <div className="filter-bar">
        <select
          className="filter-select"
          value={filterSub}
          onChange={(e) => setFilterSub(e.target.value)}
        >
          <option value="All">All Subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Urgent">Urgent / Overdue</option>
        </select>
        <select className="filter-select" value={filterDiff}   onChange={e => setFilterDiff(e.target.value)}>
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

     

      {/* --- Assignment Cards --- */}
      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-ic">📚</div>
          <div className="empty-t">No assignments found</div>
          <div className="empty-d">Add your first assignment or adjust the filters above</div>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(a => (
            <AssignmentCard key={a.id} assignment={a}
              onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}
              onProgress={onProgress}  />
          ))}
        </div>
      )}
    </div>
  )
}