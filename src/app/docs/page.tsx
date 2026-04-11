'use client'

import { useState } from 'react'
import './docs.css'

interface Document {
  id: number
  title: string
  category: string
  date: string
  preview: string
}

const initialDocs: Document[] = [
  { id: 1, title: 'Newsletter Draft #12', category: 'Newsletter', date: '2026-04-10', preview: 'This week we covered the basics of AI agents and how they can help automate your daily workflows...' },
  { id: 2, title: 'Project Roadmap', category: 'Planning', date: '2026-04-09', preview: 'Phase 1: Build Mission Control dashboard with core screens. Phase 2: Add calendar integration...' },
  { id: 3, title: 'Content Strategy Q2', category: 'Marketing', date: '2026-04-08', preview: 'Focus areas: Educational content about AI tools, behind-the-scenes of workflow automation...' },
  { id: 4, title: 'Meeting Notes - AI Discussion', category: 'Notes', date: '2026-04-07', preview: 'Discussed the future of AI agents in productivity. Key takeaways: autonomy, memory, and tool use...' },
  { id: 5, title: 'Product Requirements Doc', category: 'Planning', date: '2026-04-06', preview: 'Core features: Task board, calendar, memory viewer, document archive, team management...' },
]

const categories = ['All', 'Newsletter', 'Planning', 'Marketing', 'Notes']

export default function Docs() {
  const [docs] = useState<Document[]>(initialDocs)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })
return (
    <div className='docs-page'>
      <div className='page-header'>
        <h1>Docs</h1>
        <p>Searchable archive of all documents created by your AI</p>
      </div>

      <div className='docs-layout'>
        <div className='docs-sidebar card'>
          <div className='search-section'>
            <input
              type='text'
              placeholder='Search documents...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-input'
            />
          </div>
          <div className='category-list'>
            <span className='category-label'>Categories</span>
            {categories.map(cat => (
              <div
                key={cat}
                className={'category-item ' + (selectedCategory === cat ? 'active' : '')}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                <span className='cat-count'>
                  {cat === 'All' ? docs.length : docs.filter(d => d.category === cat).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='docs-content'>
          {selectedDoc ? (
            <div className='doc-viewer card'>
              <div className='viewer-header'>
                <div>
                  <h2>{selectedDoc.title}</h2>
                  <span className='doc-meta'>{selectedDoc.category} - {selectedDoc.date}</span>
                </div>
                <button onClick={() => setSelectedDoc(null)} className='close-btn'>X</button>
              </div>
              <div className='viewer-body'>
                <p>{selectedDoc.preview}</p>
                <p className='placeholder'>Full document content would appear here. In a real implementation, this would display the complete document text, formatted properly.</p>
              </div>
              <div className='viewer-actions'>
                <button className='btn-secondary'>Copy to Clipboard</button>
                <button className='btn-primary'>Edit Document</button>
              </div>
            </div>
          ) : (
            <div className='docs-grid'>
              {filteredDocs.map(doc => (
                <div
                  key={doc.id}
                  className='doc-card card'
                  onClick={() => setSelectedDoc(doc)}
                >
                  <div className='doc-card-header'>
                    <span className={'doc-category ' + doc.category.toLowerCase()}>{doc.category}</span>
                    <span className='doc-date'>{doc.date}</span>
                  </div>
                  <h3 className='doc-title'>{doc.title}</h3>
                  <p className='doc-preview'>{doc.preview}</p>
                </div>
              ))}
              {filteredDocs.length === 0 && (
                <p className='no-results'>No documents found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
