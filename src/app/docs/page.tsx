'use client'

import { useState, useEffect } from 'react'
import './docs.css'

interface Document {
  id: number
  title: string
  category: string
  date: string
  content: string
}

const categories = ['All', 'Technical', 'Workflow', 'Planning', 'Notes']

export default function Docs() {
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setDocs(data.docs || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return <div className='docs-page'><p>Loading...</p></div>
  }
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
                <p>{selectedDoc.content}</p>
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
                  <p className='doc-preview'>{doc.content}</p>
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
