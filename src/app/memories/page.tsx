'use client'

import { useState, useEffect } from 'react'
import './memories.css'

interface Memory {
  id: number
  date: string
  summary: string
  details: string[]
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setMemories(data.memories || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredMemories = memories.filter(m =>
    m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return <div className='memories-page'><p>Loading...</p></div>
  }

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
                onClick={() => setSelectedMemory(selectedMemory?.id === memory.id ? null : memory)}
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
