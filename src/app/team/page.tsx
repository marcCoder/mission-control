'use client'

import { useState } from 'react'
import './team.css'

interface Agent {
  id: number
  name: string
  role: string
  device: string
  status: 'active' | 'idle' | 'busy'
}

const initialAgents: Agent[] = [
  { id: 1, name: 'Morpheus (Main)', role: 'Primary AI Assistant', device: 'Termux/Android', status: 'active' },
  { id: 2, name: 'Charlie', role: 'Software Engineer', device: 'Mac Studio', status: 'idle' },
  { id: 3, name: 'Violet', role: 'Research Agent', device: 'Cloud', status: 'active' },
  { id: 4, name: 'Ralph', role: 'Content Creator', device: 'Windows PC', status: 'idle' },
  { id: 5, name: 'Echo', role: 'Data Analyst', device: 'Linux Server', status: 'busy' },
]

export default function Team() {
  const [agents] = useState<Agent[]>(initialAgents)
  const [mission, setMission] = useState('Build an autonomous organization of AI agents that do work for me and produce value 24/7.')
  const [editingMission, setEditingMission] = useState(false)
  const [missionInput, setMissionInput] = useState(mission)

  const saveMission = () => {
    setMission(missionInput)
    setEditingMission(false)
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--success)'
      case 'idle': return 'var(--warning)'
      case 'busy': return 'var(--error)'
      default: return 'var(--text-tertiary)'
    }
  }
return (
    <div className='team-page'>
      <div className='page-header'>
        <h1>Team</h1>
        <p>Org chart of all AI agents and sub-agents</p>
      </div>

      <div className='team-layout'>
        <div className='mission-card card'>
          <div className='mission-header'>
            <h3 className='card-title'>Mission Statement</h3>
            <button
              onClick={() => editingMission ? saveMission() : setEditingMission(true)}
              className='edit-btn'
            >
              {editingMission ? 'Save' : 'Edit'}
            </button>
          </div>
          {editingMission ? (
            <div className='mission-edit'>
              <textarea
                value={missionInput}
                onChange={(e) => setMissionInput(e.target.value)}
                className='mission-input'
                rows={3}
              />
            </div>
          ) : (
            <p className='mission-text'>{mission}</p>
          )}
        </div>

        <div className='org-chart card'>
          <h3 className='card-title'>Organization</h3>
          <div className='agents-tree'>
            <div className='main-agent'>
              <div className='agent-node main'>
                <span className='agent-name'>{agents[0].name}</span>
                <span className='agent-role'>{agents[0].role}</span>
                <span className='agent-device'>{agents[0].device}</span>
                <span
                  className='agent-status'
                  style={{ backgroundColor: statusColor(agents[0].status) }}
                >
                  {agents[0].status}
                </span>
              </div>
              <div className='sub-agents'>
                {agents.slice(1).map(agent => (
                  <div key={agent.id} className='agent-node'>
                    <div className='agent-connector'></div>
                    <span className='agent-name'>{agent.name}</span>
                    <span className='agent-role'>{agent.role}</span>
                    <span className='agent-device'>{agent.device}</span>
                    <span
                      className='agent-status'
                      style={{ backgroundColor: statusColor(agent.status) }}
                    >
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='agents-list card'>
          <h3 className='card-title'>All Agents</h3>
          <div className='agents'>
            {agents.map(agent => (
              <div key={agent.id} className='agent-row'>
                <div className='agent-info'>
                  <span className='agent-name'>{agent.name}</span>
                  <span className='agent-role'>{agent.role}</span>
                </div>
                <div className='agent-meta'>
                  <span className='agent-device'>{agent.device}</span>
                  <span
                    className='agent-badge'
                    style={{ backgroundColor: statusColor(agent.status) }}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
