import { useState, useEffect } from 'react'
import { STORAGE_KEY } from './helpers'

function loadAssignments() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}

export function useAssignments() {
  const [assignments, setAssignments] = useState(loadAssignments)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(assignments)
    )
  }, [assignments])

  const addAssignment = (data) => {
    const newAssignment = {
      id: Date.now().toString(),
      title: data.title,
      subject: data.subject,
      dueDate: data.dueDate,
      difficulty: data.difficulty,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setAssignments((prev) => [
      newAssignment,
      ...prev
    ])
  }

  const updateAssignment = (id, data) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, ...data } : a
      )
    )
  }

  const deleteAssignment = (id) => {
    setAssignments((prev) =>
      prev.filter((a) => a.id !== id)
    )
  }

  const toggleComplete = (id) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              completed: !a.completed
            }
          : a
      )
    )
  }

  return {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleComplete
  }
}