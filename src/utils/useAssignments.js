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
    setAssignments(prev => prev.filter(a => !a.completed || new Date(a.dueDate ) > cutoff))
  }, [])

  const addAssignment = data =>
    setAssignments(prev => [{ id: Date.now().toString(), ...data, completed: false, createdAt: new Date().toISOString() }, ...prev])

  const updateAssignment = (id, data) =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...data } : a))

  const deleteAssignment = id =>
    setAssignments(prev => prev.filter(a => a.id !== id))

  const toggleComplete = id =>
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed} : a))

  return { assignments, addAssignment, updateAssignment, deleteAssignment, toggleComplete}
}