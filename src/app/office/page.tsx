'use client'

import { useState, useEffect } from 'react'
import './office.css'

interface Agent {
  id: number
  name: string
  role: string
  desk: number
  status: 'working' | 'idle' | 'meeting'
  currentTask: string
}

const initialAgents: Agent[] = [
  { id: 1, name: 'Morpheus', role: 'Main Agent', desk: 1, status: 'working', currentTask: 'Managing dashboard' },
  { id: 2, name: 'Charlie', role: 'Engineer', desk: 2, status: 'idle', currentTask: 'None' },
  { id: 3, name: 'Violet', role: 'Research', desk: 3, status: 'working', currentTask: 'Analyzing data' },
  { id: 4, name: 'Ralph', role: 'Content', desk: 4, status: 'meeting', currentTask: 'In meeting' },
]

export default function Office() {
  const [agents] = useState<Agent[]>(initialAgents)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'working': return 'W'
      case 'idle': return 'I'
      case 'meeting': return 'M'
      default: return '-'
    }
  }
return (
    <div className='office-page'>
      <div className='page-header'>
        <h1>Office</h1>
        <p>2D visualization of your AI agents at work</p>
      </div>

      <div className='office-container'>
        <div className='office-header'>
          <div className='time-display'>
            <span className='time'>{time.toLocaleTimeString()}</span>
            <span className='date'>{time.toLocaleDateString()}</span>
          </div>
          <div className='office-legend'>
            <span className='legend-item'><span className='legend-icon working'>W</span> Working</span>
            <span className='legend-item'><span className='legend-icon idle'>I</span> Idle</span>
            <span className='legend-item'><span className='legend-icon meeting'>M</span> Meeting</span>
          </div>
        </div>

        <div className='office-floor'>
          <div className='office-walls'>
            <div className='wall-top'>MISSION CONTROL HQ</div>
            <div className='desks-row'>
              {agents.map(agent => (
                <div key={agent.id} className={'desk ' + agent.status}>
                  <div className='desk-surface'>
                    <div className='agent-avatar'>
                      {agent.name.charAt(0)}
                    </div>
                    <span className='agent-name'>{agent.name}</span>
                    <span className={'status-indicator ' + agent.status}>
                      {getStatusIcon(agent.status)}
                    </span>
                  </div>
                  <div className='desk-label'>
                    <span className='role'>{agent.role}</span>
                    <span className='task'>{agent.currentTask}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className='water-cooler'>
              <span className='wc-icon'>~</span>
              <span className='wc-label'>Water Cooler</span>
              <span className='wc-status'>Agents gather here when idle</span>
            </div>
          </div>
        </div>

        <div className='activity-panel card'>
          <h3 className='card-title'>Live Feed</h3>
          <div className='activity-feed'>
            <div className='activity-item'>
              <span className='activity-time'>10:42:15</span>
              <span className='activity-text'>Morpheus is managing the dashboard</span>
            </div>
            <div className='activity-item'>
              <span className='activity-time'>10:41:30</span>
              <span className='activity-text'>Violet completed data analysis</span>
            </div>
            <div className='activity-item'>
              <span className='activity-time'>10:40:55</span>
              <span className='activity-text'>Ralph joined a meeting</span>
            </div>
            <div className='activity-item'>
              <span className='activity-time'>10:40:12</span>
              <span className='activity-text'>Charlie is idle, waiting for tasks</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
