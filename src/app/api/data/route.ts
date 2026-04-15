import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const dataDir = 'C:\\\\Users\\\\marcw\\\\mission-control\\\\data'

  try {
    const tasks = JSON.parse(fs.readFileSync(path.join(dataDir, 'tasks.json'), 'utf8'))
    const memories = JSON.parse(fs.readFileSync(path.join(dataDir, 'memories.json'), 'utf8'))
    const docs = JSON.parse(fs.readFileSync(path.join(dataDir, 'docs.json'), 'utf8'))
    
    return NextResponse.json({
      tasks: tasks.tasks,
      memories: memories.memories,
      docs: docs.docs
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data', details: String(error) }, { status: 500 })
  }
}
