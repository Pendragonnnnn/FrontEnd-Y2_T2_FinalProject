import React, { useState } from 'react'
import { DIFF_COLORS, SUBJECTS as DEFAULT_SUBJECTS } from '../utils/helpers'
import { useSubjects } from '../utils/useSubjects'

export default function AddModal({
  initial,
  onClose,
  onSave,
}) {
  const { subjects, addSubject, removeSubject } = useSubjects()
  const today = new Date()
    .toISOString()
    .split('T')[0]

  const [form, setForm] = useState({
    title: initial?.title || '',
    subject: initial?.subject || '',
    dueDate: initial?.dueDate || today,
    difficulty:
      initial?.difficulty || 'Medium',
  })

  const [newSubject, setNewSubject] = useState('')

  const upd = (key, value) =>
    setForm(prev => ({
      ...prev,
      [key]: value,
    }))

  const addNewSubject = () => {
    if (newSubject.trim()) {
      addSubject(newSubject.trim())
      upd('subject', newSubject.trim())
      setNewSubject('')
    }
  }

  const valid =
    form.title.trim() && form.subject.trim()

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">
            {initial
              ? 'Edit Assignment'
              : 'New Assignment'}
          </div>
          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="form-field">
          <label>Assignment Title *</label>
          <input
            className="form-input"
            value={form.title}
            placeholder="Please Enter Your Title!"
            onChange={e => upd('title', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label>Subject *</label>
          <select
            className="form-input"
            value={form.subject}
            onChange={e => upd('subject', e.target.value)}
          >
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          {form.subject && !DEFAULT_SUBJECTS.includes(form.subject) && (
            <button
              type="button"
              className="form-cancel"
              onClick={() => {
                removeSubject(form.subject)
                upd('subject', '')
              }}
              style={{ marginTop: '8px', padding: '4px 8px', fontSize: '12px' }}
            >
              Remove "{form.subject}" from list
            </button>
          )}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <input
              className="form-input"
              value={newSubject}
              placeholder="Add new subject"
              onChange={e => setNewSubject(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="form-save"
              onClick={addNewSubject}
              disabled={!newSubject.trim()}
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="form-field">
          <label>Due Date *</label>
          <input
            className="form-input"
            type="date"
            value={form.dueDate}
            onChange={e =>
              upd('dueDate', e.target.value)
            }
          />
        </div>

        <div className="form-field">
          <label>Difficulty</label>
          <div className="diff-opts">
            {['Easy', 'Medium', 'Hard'].map(
              d => (
                <button
                  key={d}
                  type="button"
                  className="diff-btn"
                  style={
                    form.difficulty === d
                      ? {
                          background: `${DIFF_COLORS[d]}22`,
                          color:
                            DIFF_COLORS[d],
                          borderColor:
                            DIFF_COLORS[d],
                        }
                      : {}
                  }
                  onClick={() =>
                    upd('difficulty', d)
                  }
                >
                  {d}
                </button>
              )
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            className="form-cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="form-save"
            disabled={!valid}
            onClick={() =>
              valid && onSave(form)
            }
          >
            {initial
              ? 'Save Changes'
              : 'Add Assignment'}
          </button>
        </div>
      </div>
    </div>
  )
}