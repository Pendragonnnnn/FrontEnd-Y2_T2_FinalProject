import React from 'react'
import { getPriority, PRIO_COLORS } from '../utils/helpers'

const MONTHS   = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export default function CalendarView({ assignments, month, onMonthChange }) {
  const yr = month.getFullYear(), mo = month.getMonth()
  const firstDay = new Date(yr, mo, 1).getDay()
  const dims     = new Date(yr, mo + 1, 0).getDate()
  const today    = new Date()

  const emptySlotsAtStart = []
  for (let i = 0; i < firstDay; i++) {
    emptySlotsAtStart.push(null)
  }

  const daysInMonth = []
  for (let day = 1; day <= dims; day++) {
    daysInMonth.push(day)
  }
  const cells = [...emptySlotsAtStart, ...daysInMonth]

  const dayAssignments = (day) => {
  if (!day) return [] 
  const month = String(mo + 1).padStart(2, '0') 
  const dayStr = String(day).padStart(2, '0')
  const dateString = `${yr}-${month}-${dayStr}`

  return assignments.filter(assignment => assignment.dueDate === dateString)
}

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={() => onMonthChange(new Date(yr, mo - 1))}>◂</button>
        <span className="cal-month">{MONTHS[mo]} {yr}</span>
        <button className="cal-nav-btn" onClick={() => onMonthChange(new Date(yr, mo + 1))}>▸</button>
      </div>
      <div className="cal-grid">
        <div className="cal-wk">
          {WEEKDAYS.map(d => 
          <div key={d}>{d}</div>
        )}
          </div>
        <div className="cal-days">
          {cells.map((day, i) => {
            const isToday =
            day !== null &&
            today.getDate() === day &&
            today.getMonth() === mo &&
            today.getFullYear() === yr
            return (
              <div key={i} className={`cal-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''}`}>
                {day && (
                  <>
                    <span className="cal-day-num">{day}</span>
                    {dayAssignments(day).map(a => {
                      const c = PRIO_COLORS[getPriority(a.dueDate, a.completed)]
                      return <div key={a.id} className="cal-event" style={{ background: `${c}20`, borderLeftColor: c, color: c }}>{a.title}</div>
                    })}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
