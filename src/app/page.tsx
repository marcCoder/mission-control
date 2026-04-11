'use client'

import { useState } from 'react'
import './page.css'

interface Task {
  id: number
  title: string
  description: string
  assignee: 'A' | 'AI'
  status: 'backlog' | 'in-progress' | 'in-review' | 'done'
}

const initialTasks: Task[] = [
  { id: 1, title: 'Set up Mission Control', description: 'Build initial Next.js template with sidebar', assignee: 'AI', status: 'done' },
  { id: 2, title: 'Create Task Board screen', description: 'Kanban board with columns and activity feed', assignee: 'AI', status: 'in-progress' },
  { id: 3, title: 'Build Calendar view', description: 'Monthly calendar with scheduled tasks', assignee: 'AI', status: 'backlog' },
  { id: 4, title: 'Define mission statement', description: 'Reverse prompt to establish team goals', assignee: 'A', status: 'in-review' },
]

const activityLog = [
  { time: '10:42:15', action: 'Building Task Board component with Kanban layout' },
  { time: '10:41:58', action: 'Creating sidebar navigation structure' },
  { time: '10:41:30', action: 'Initializing Next.js project template' },
  { time: '10:40:55', action: 'Reviewing Mission Control requirements' },
]

const columns = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'in-review', label: 'In Review' },
  { id: 'done', label: 'Done' },
]

export default function TaskBoard() {
  const [tasks] = useState<Task[]>(initialTasks)

  const getTasksByStatus = (status: Task['status']) => tasks.filter(t => t.status === status)
  return (
    <div className='task-board-page'>
      <div className='page-header'>
        <h1>Task Board</h1>
        <p>Track everything your AI is working on</p>
      </div>

      <div className='task-board-layout'>
        <div className='activity-feed card'>
          <div className='card-header'>
            <h3 className='card-title'>Live Activity</h3>
          </div>
          <div className='activity-list'>
            {activityLog.map((item, i) => (
              <div key={i} className='activity-item'>
                <span className='activity-time'>{item.time}</span>
                <span className='activity-action'>{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='kanban-board'>
          <div className='kanban-header'>
            <h2>Tasks</h2>
            <button className='btn-primary'>+ New Task</button>
          </div>
          <div className='kanban-columns'>
            {columns.map(col => (
              <div key={col.id} className='kanban-column'>
                <div className='column-header'>
                  <span className='column-title'>{col.label}</span>
                  <span className='column-count'>{getTasksByStatus(col.id as Task['status']).length}</span>
                </div>
                <div className='column-tasks'>
                  {getTasksByStatus(col.id as Task['status']).map(task => (
                    <div key={task.id} className={'task-card ' + (task.status === 'done' ? 'done' : '')}>
                      <div className='task-header'>
                        <span className={'assignee-badge ' + (task.assignee === 'AI' ? 'ai' : 'user')}>
                          {task.assignee}
                        </span>
                      </div>
                      <h4 className='task-title'>{task.title}</h4>
                      <p className='task-description'>{task.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
