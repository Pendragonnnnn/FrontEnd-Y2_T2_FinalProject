import React, { useState } from 'react'
import { SUBJECTS, DIFF_COLORS } from '../utils/helpers'

export default function AddModal({ initial, onClose, onSave }) {
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({
    title:      initial?.title      || '',
    subject:    initial?.subject    || 'Math',
    dueDate:    initial?.dueDate    || today,
    difficulty: initial?.difficulty || 'Medium',
    schedule:   initial?.schedule   || '',
  })
  const upd   = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const valid = form.title.trim() && form.dueDate

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{initial ? 'Edit Assignment' : 'New Assignment'}</div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="form-field">
          <label className="form-label">Assignment Title *</label>
          <input className="form-input" placeholder="e.g. Chapter 5 Essay" value={form.title}
            onChange={e => upd('title', e.target.value)} autoFocus />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label">Subject</label>
            <select className="form-input" value={form.subject} onChange={e => upd('subject', e.target.value)}>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-field">
            <label className="form-label">Due Date *</label>
            <input className="form-input" type="date" value={form.dueDate} onChange={e => upd('dueDate', e.target.value)} />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Difficulty</label>
          <div className="diff-opts">
            {['Easy', 'Medium', 'Hard'].map(d => (
              <button key={d} type="button" className="diff-btn"
                style={form.difficulty === d ? { background: `${DIFF_COLORS[d]}22`, color: DIFF_COLORS[d], borderColor: DIFF_COLORS[d] } : {}}
                onClick={() => upd('difficulty', d)}>{d}</button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="form-cancel" onClick={onClose}>Cancel</button>
          <button className="form-save" onClick={() => valid && onSave(form)} disabled={!valid}>
            {initial ? 'Save Changes' : 'Add Assignment'}
          </button>
        </div>
      </div>
    </div>
  )
}