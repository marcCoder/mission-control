'use client'

import { useState, useEffect } from 'react'
import './page.css'

interface Task {
  id: number
  title: string
  description: string
  assignee: 'A' | 'AI'
  status: 'backlog' | 'in-progress' | 'in-review' | 'done'
  createdAt: string
}

const columns = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'in-review', label: 'In Review' },
  { id: 'done', label: 'Done' },
]

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const getTasksByStatus = (status: Task['status']) => tasks.filter(t => t.status === status)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return <div className='task-board-page'><p>Loading...</p></div>
  }

  return (
    <div className='task-board-page'>
      <div className='page-header'>
        <h1>Task Board</h1>
        <p>Track everything your AI is working on</p>
      </div>

      <div className='kanban-board-full'>
        <div className='kanban-columns'>
          {columns.map(col => (
            <div key={col.id} className='kanban-column'>
              <div className='column-header'>
                <span className='column-title'>{col.label}</span>
                <span className='column-count'>{getTasksByStatus(col.id as Task['status']).length}</span>
              </div>
              <div className='column-tasks'>
                {getTasksByStatus(col.id as Task['status']).map(task => (
                  <div
                    key={task.id}
                    className={'task-card ' + (task.status === 'done' ? 'done' : '') + (selectedTask?.id === task.id ? 'selected' : '')}
                    onClick={() => setSelectedTask(selectedTask?.id === task.id ? null : task)}
                  >
                    <div className='task-header'>
                      <span className={'assignee-badge ' + (task.assignee === 'AI' ? 'ai' : 'user')}>
                        {task.assignee}
                      </span>
                      <span className='task-date'>{formatDate(task.createdAt)}</span>
                    </div>
                    <h4 className='task-title'>{task.title}</h4>
                    <p className='task-description'>{task.description}</p>
                    {selectedTask?.id === task.id && (
                      <div className='task-details'>
                        <span className='detail-label'>Created:</span>
                        <span className='detail-value'>{formatDate(task.createdAt)}</span>
                        <span className='detail-label'>Status:</span>
                        <span className='detail-value'>{task.status}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
