import { useState, useEffect } from 'react'
import { SUBJECTS as DEFAULT_SUBJECTS } from './helpers'

const SUBJECTS_STORAGE_KEY = 'scholar_subjects_v2'

function loadSubjects() {
  try {
    const stored = JSON.parse(localStorage.getItem(SUBJECTS_STORAGE_KEY) || '[]')
    // Merge with defaults, remove duplicates
    const all = [...DEFAULT_SUBJECTS, ...stored]
    return [...new Set(all)]
  } catch {
    return [...DEFAULT_SUBJECTS]
  }
}

export function useSubjects() {
  const [subjects, setSubjects] = useState(loadSubjects)

  useEffect(() => {
    // Only store custom subjects (not the defaults)
    const customSubjects = subjects.filter(s => !DEFAULT_SUBJECTS.includes(s))
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(customSubjects))
  }, [subjects])

  const addSubject = (subject) => {
    if (subject.trim() && !subjects.includes(subject.trim())) {
      setSubjects(prev => [...prev, subject.trim()])
    }
  }

  const removeSubject = (subject) => {
    if (!DEFAULT_SUBJECTS.includes(subject)) {
      setSubjects(prev => prev.filter(s => s !== subject))
    }
  }

  return { subjects, addSubject, removeSubject }
}