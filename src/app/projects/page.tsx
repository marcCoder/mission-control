'use client'

import { useState } from 'react'
import './projects.css'

interface Project {
  id: number
  name: string
  description: string
  progress: number
  lastUpdated: string
  tasks: number
}

const initialProjects: Project[] = [
  { id: 1, name: 'Mission Control', description: 'Build custom dashboard for OpenClaw', progress: 35, lastUpdated: '2026-04-11', tasks: 12 },
  { id: 2, name: 'Content Calendar', description: 'Plan and schedule social media content', progress: 60, lastUpdated: '2026-04-10', tasks: 8 },
  { id: 3, name: 'Learning Path', description: 'Master React and Next.js development', progress: 20, lastUpdated: '2026-04-09', tasks: 24 },
  { id: 4, name: 'Automation Setup', description: 'Automate daily workflows with AI agents', progress: 45, lastUpdated: '2026-04-11', tasks: 6 },
]

export default function Projects() {
  const [projects] = useState<Project[]>(initialProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  return (
    <div className='projects-page'>
      <div className='page-header'>
        <h1>Projects</h1>
        <p>Track all your major projects and their progress</p>
      </div>

      <div className='projects-container'>
        <div className='projects-grid'>
          {projects.map(project => (
            <div
              key={project.id}
              className={'project-card ' + (selectedProject?.id === project.id ? 'selected' : '')}
              onClick={() => setSelectedProject(project)}
            >
              <div className='project-header'>
                <h3 className='project-name'>{project.name}</h3>
                <span className='project-tasks'>{project.tasks} tasks</span>
              </div>
              <p className='project-description'>{project.description}</p>
              <div className='progress-section'>
                <div className='progress-bar'>
                  <div
                    className='progress-fill'
                    style={{ width: project.progress + '%' }}
                  ></div>
                </div>
                <span className='progress-text'>{project.progress}%</span>
              </div>
              <div className='project-footer'>
                <span className='last-updated'>Updated {project.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className='project-detail card'>
            <div className='detail-header'>
              <h2>{selectedProject.name}</h2>
              <button onClick={() => setSelectedProject(null)} className='close-btn'>X</button>
            </div>
            <p className='detail-description'>{selectedProject.description}</p>
            <div className='detail-stats'>
              <div className='stat'>
                <span className='stat-value'>{selectedProject.progress}%</span>
                <span className='stat-label'>Complete</span>
              </div>
              <div className='stat'>
                <span className='stat-value'>{selectedProject.tasks}</span>
                <span className='stat-label'>Total Tasks</span>
              </div>
              <div className='stat'>
                <span className='stat-value'>{Math.round(selectedProject.tasks * (selectedProject.progress / 100))}</span>
                <span className='stat-label'>Done</span>
              </div>
            </div>
            <div className='detail-actions'>
              <button className='btn-primary'>View All Tasks</button>
              <button className='btn-secondary'>Add Task</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
