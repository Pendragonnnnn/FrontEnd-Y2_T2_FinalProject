import { getPriority, countdownText, formatDate, DIFF_COLORS, PRIO_COLORS } from '../utils/helpers'

export default function AssignmentCard({ assignment: a, onToggle, onDelete, onEdit, onProgress, onAttach }) {
  const prio      = getPriority(a.dueDate, a.completed)
  const prioColor = PRIO_COLORS[prio]
  const diffColor = DIFF_COLORS[a.difficulty]

  return (
    <div className={`acard ${a.completed ? 'done' : ''}`} style={{ borderLeftColor: prioColor, background: `${prioColor}10` }}>
      <div className="card-actions">
        <button className="ic-btn" onClick={() => onEdit(a)}>✎</button>
        <button className="ic-btn" onClick={() => onDelete(a.id)}>×</button>
      </div>

      <div className="badges">
        <span className="badge badge-sub">{a.subject}</span>
        <span className="badge" style={{ background: `${diffColor}20`, color: diffColor }}>{a.difficulty}</span>
        <span className="badge" style={{ background: `${prioColor}20`, color: prioColor }}>
          {prio.charAt(0).toUpperCase() + prio.slice(1)}
        </span>
      </div>

      <div className={`card-title ${a.completed ? 'struck' : ''}`}>{a.title}</div>
      <div className="card-countdown" style={{ color: prioColor }}>{countdownText(a.dueDate, a.completed)} · {formatDate(a.dueDate)}</div>
      {a.schedule && <div className="card-schedule">📅 {a.schedule}</div>}

      <div className="card-prog">
        <div className="card-prog-head">
          <span>Progress</span>
          <span style={{ color: prioColor }}>{a.progress}%</span>
        </div>
        <div className="card-prog-track">
          <div className="card-prog-fill" style={{ width: `${a.progress}%`, background: prioColor }} />
        </div>
        <input type="range" min={0} max={100} value={a.progress} className="card-prog-range"
          onChange={e => onProgress(a.id, parseInt(e.target.value))} />
      </div>

      {a.files?.length > 0 && (
        <div className="card-files">
          {a.files.map((f, i) => <span key={i} className="file-chip">📎 {f}</span>)}
        </div>
      )}

      <div className="card-footer">
        <button className={`complete-btn ${a.completed ? 'yes' : ''}`} onClick={() => onToggle(a.id)}>
          {a.completed ? '✓ Completed' : '○ Mark Complete'}
        </button>
        <label className="attach-btn">
          📎 Attach
          <input type="file" style={{ display: 'none' }}
            onChange={e => { if (e.target.files[0]) onAttach(a.id, e.target.files[0].name); e.target.value = '' }} />
        </label>
      </div>
    </div>
  )
}
