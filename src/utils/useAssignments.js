import { useState, useEffect } from 'react'
import { STORAGE_KEY } from './helpers'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
}

export function useAssignments() {
  const [assignments, setAssignments] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments))
  }, [assignments])

  useEffect(() => {
    const cutoff = Date.now() - 30 * 86400000
    setAssignments(prev => prev.filter(a => !a.completed || new Date(a.dueDate + 'T00:00:00') > cutoff))
  }, [])

  const addAssignment = data =>
    setAssignments(prev => [{ id: Date.now().toString(), ...data, progress: 0, completed: false, files: [], createdAt: new Date().toISOString() }, ...prev])

  const updateAssignment = (id, data) =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a))

  const deleteAssignment = id =>
    setAssignments(prev => prev.filter(a => a.id !== id))

  const toggleComplete = id =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed, progress: a.completed ? a.progress : 100 } : a))

  const updateProgress = (id, progress) =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, progress, completed: progress === 100 } : a))

  const attachFile = (id, fileName) =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, files: [...(a.files || []), fileName] } : a))

  return { assignments, addAssignment, updateAssignment, deleteAssignment, toggleComplete, updateProgress, attachFile }
}
