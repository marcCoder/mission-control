'use client'

import { useState } from 'react'
import './memories.css'

interface Memory {
  id: number
  date: string
  summary: string
  details: string[]
}

const initialMemories: Memory[] = [
  {
    id: 1,
    date: '2026-04-11',
    summary: 'Mission Control Setup',
    details: [
      'Discussed building a custom dashboard for OpenClaw',
      'Created GitHub repository for mission-control',
      'Set up Next.js project with dark theme',
      'Built Task Board and Calendar screens',
    ]
  },
  {
    id: 2,
    date: '2026-04-10',
    summary: 'Planning Session',
    details: [
      'Discussed content creation workflow',
      'Reviewed automation ideas for social media',
      'Planned out 5 core screens for mission control',
    ]
  },
  {
    id: 3,
    date: '2026-04-09',
    summary: 'Learning Goals',
    details: [
      'Focused on improving technical knowledge',
      'Discussed React and Next.js fundamentals',
      'Covered Git workflow and version control',
    ]
  },
]

export default function Memories() {
  const [memories] = useState<Memory[]>(initialMemories)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMemories = memories.filter(m =>
    m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className='memories-page'>
      <div className='page-header'>
        <h1>Memories</h1>
        <p>Browse past conversations organized by date</p>
      </div>

      <div className='memories-layout'>
        <div className='memories-list card'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search memories...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
          </div>
          <div className='memory-items'>
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                className={'memory-item ' + (selectedMemory?.id === memory.id ? 'selected' : '')}
                onClick={() => setSelectedMemory(memory)}
              >
                <span className='memory-date'>{memory.date}</span>
                <span className='memory-summary'>{memory.summary}</span>
              </div>
            ))}
            {filteredMemories.length === 0 && (
              <p className='no-results'>No memories found</p>
            )}
          </div>
        </div>

        <div className='memory-detail card'>
          {selectedMemory ? (
            <>
              <div className='detail-header'>
                <h2>{selectedMemory.summary}</h2>
                <span className='detail-date'>{selectedMemory.date}</span>
              </div>
              <div className='detail-content'>
                {selectedMemory.details.map((detail, i) => (
                  <div key={i} className='detail-item'>
                    <span className='bullet'>-</span>
                    <span className='detail-text'>{detail}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='no-selection'>
              <p>Select a memory to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
