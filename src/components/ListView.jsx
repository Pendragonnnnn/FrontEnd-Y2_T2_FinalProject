import React from 'react'
import AssignmentCard from './AssignmentCard'
import { getPriority } from '../utils/helpers'

export default function ListView({
  assignments,
  search,
  filterSub,
  setFilterSub,
  filterStatus,
  setFilterStatus,
  filterDiff,
  setFilterDiff,
  onToggle,
  onDelete,
  onEdit,
  onProgress,
  onAttach,
  doneCount,
  total,
  rate,
}) {
  const q = search.toLowerCase()

  const filtered = assignments
    .filter(a => {
      if (
        q &&
        !a.title.toLowerCase().includes(q) &&
        !(a.subject || '').toLowerCase().includes(q)
      )
        return false

      if (filterSub !== 'All' && a.subject !== filterSub)
        return false

      if (
        filterDiff !== 'All' &&
        a.difficulty !== filterDiff
      )
        return false

      if (
        filterStatus === 'Completed' &&
        !a.completed
      )
        return false

      if (
        filterStatus === 'Active' &&
        a.completed
      )
        return false

      if (filterStatus === 'Urgent') {
        const p = getPriority(
          a.dueDate,
          a.completed
        )

        if (
          p !== 'urgent' &&
          p !== 'overdue'
        )
          return false
      }

      return true
    })
    .sort((a, b) => {
      if (a.completed !== b.completed)
        return a.completed ? 1 : -1

      return (
        new Date(a.dueDate) -
        new Date(b.dueDate)
      )
    })

  return (
    <div className="list-wrap">
      {filtered.length === 0 ? (
        <div className="empty">
          No assignments found
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(a => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onAttach={onAttach}
            />
          ))}
        </div>
      )}
    </div>
  )
}