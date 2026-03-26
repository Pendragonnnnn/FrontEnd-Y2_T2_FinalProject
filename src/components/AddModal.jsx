import React, { useState } from 'react'
import { SUBJECTS, DIFF_COLORS } from '../utils/helpers'

// This component is used for BOTH adding and editing assignments
export default function AddModal({ initial, onClose, onSave }) {

  // Get today's date (default value for due date)
  const today = new Date().toISOString().split('T')[0]

  // Form state (if editing, use initial data, else use defaults)
  const [form, setForm] = useState({
    title:      initial?.title      || '',
    subject:    initial?.subject    || 'Math',
    dueDate:    initial?.dueDate    || today,
    difficulty: initial?.difficulty || 'Medium',
    schedule:   initial?.schedule   || '',
  })

  // Update form value helper
  const Update = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Simple validation (title + due date must exist)
  const valid = form.title.trim() && form.dueDate

  return (
    // Close modal when clicking outside
    <div
      className="modal-overlay"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            {initial ? 'Edit Assignment' : 'New Assignment'}
          </div>

          {/* Close button */}
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Title input */}
        <div className="form-field">
          <label className="form-label">Assignment Title *</label>
          <input
            className="form-input"
            placeholder="e.g. Chapter 5 Essay"
            value={form.title}
            onChange={e => Update('title', e.target.value)}
            autoFocus
          />
        </div>

        {/* Subject + Due Date */}
        <div className="form-row">

          {/* Subject dropdown */}
          <div className="form-field">
            <label className="form-label">Subject</label>
            <select
              className="form-input"
              value={form.subject}
              onChange={e => Update('subject', e.target.value)}
            >
              {SUBJECTS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Due date input */}
          <div className="form-field">
            <label className="form-label">Due Date *</label>
            <input
              className="form-input"
              type="date"
              value={form.dueDate}
              onChange={e => Update('dueDate', e.target.value)}
            />
          </div>
        </div>

        {/* Difficulty selection */}
        <div className="form-field">
          <label className="form-label">Difficulty</label>

          <div className="diff-opts">
            {['Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                type="button"
                className="diff-btn"

                // Highlight selected difficulty
                style={
                  form.difficulty === d
                    ? {
                        background: `${DIFF_COLORS[d]}22`,
                        color: DIFF_COLORS[d],
                        borderColor: DIFF_COLORS[d]
                      }
                    : {}
                }

                onClick={() => Update('difficulty', d)}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Optional schedule input */}
        <div className="form-field">
          <label className="form-label">Expected Schedule (optional)</label>
          <input
            className="form-input"
            placeholder="e.g. 2 hrs/day, Mon–Wed evenings"
            value={form.schedule}
            onChange={e => Update('schedule', e.target.value)}
          />
        </div>

        {/* Action buttons */}
        <div className="form-actions">

          {/* Cancel button */}
          <button className="form-cancel" onClick={onClose}>
            Cancel
          </button>

          {/* Save button (disabled if not valid) */}
          <button
            className="form-save"
            onClick={() => valid && onSave(form)}
            disabled={!valid}
          >
            {initial ? 'Save Changes' : 'Add Assignment'}
          </button>
        </div>

      </div>
    </div>
  )
}