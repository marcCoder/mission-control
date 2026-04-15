'use client'

import { useState, useEffect } from 'react'
import './projects.css'

interface Task {
  id: number
  title: string
  description: string
  assignee: 'A' | 'AI'
  status: 'backlog' | 'in-progress' | 'in-review' | 'done'
  createdAt: string
  projectId: number
}

interface Project {
  id: number
  name: string
  description: string
  progress: number
  lastUpdated: string
  tasks: number
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || [])
        setTasks(data.tasks || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const getTasksForProject = (projectId: number) => {
    return tasks.filter(t => t.projectId === projectId)
  }

  if (loading) {
    return <div className='projects-page'><p>Loading...</p></div>
  }
return (
    <div className='projects-page'>
      <div className='page-header'>
        <h1>Projects</h1>
        <p>Track all your major projects and their progress</p>
      </div>

      <div className='projects-grid'>
        {projects.map(project => (
          <div
            key={project.id}
            className={'project-card ' + (selectedProject?.id === project.id ? 'selected' : '')}
            onClick={() => setSelectedProject(selectedProject?.id === project.id ? null : project)}
          >
            <div className='project-header'>
              <h3 className='project-name'>{project.name}</h3>
              <span className='project-tasks'>{project.tasks} tasks</span>
            </div>
            <p className='project-description'>{project.description}</p>
            <div className='progress-section'>
              <div className='progress-bar'>
                <div className='progress-fill' style={{ width: project.progress + '%' }}></div>
              </div>
              <span className='progress-text'>{project.progress}%</span>
            </div>
            <div className='project-footer'>
              <span className='last-updated'>Updated {formatDate(project.lastUpdated)}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className='project-detail card'>
          <div className='detail-header'>
            <h2>{selectedProject.name} - Tasks</h2>
            <button onClick={() => setSelectedProject(null)} className='close-btn'>X</button>
          </div>
          <div className='project-tasks-list'>
            {getTasksForProject(selectedProject.id).map(task => (
              <div key={task.id} className={'task-row ' + task.status}>
                <span className={'task-badge ' + (task.assignee === 'AI' ? 'ai' : 'user')}>{task.assignee}</span>
                <span className='task-title'>{task.title}</span>
                <span className='task-status'>{task.status}</span>
                <span className='task-date'>{formatDate(task.createdAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
