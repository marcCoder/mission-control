'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './Sidebar.css'

const navItems = [
  { href: '/', icon: 'T', label: 'Task Board' },
  { href: '/calendar', icon: 'C', label: 'Calendar' },
  { href: '/projects', icon: 'P', label: 'Projects' },
  { href: '/memories', icon: 'M', label: 'Memories' },
  { href: '/docs', icon: 'D', label: 'Docs' },
  { href: '/team', icon: 'T', label: 'Team' },
  { href: '/office', icon: 'O', label: 'Office' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='sidebar'>
      <div className='sidebar-header'>
        <h2 className='sidebar-title'>Mission Control</h2>
      </div>
      <nav className='sidebar-nav'>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={'nav-item ' + (pathname === item.href ? 'active' : '')}
          >
            <span className='nav-icon'>{item.icon}</span>
            <span className='nav-label'>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className='sidebar-footer'>
        <div className='agent-status'>
          <span className='status-dot'></span>
          <span className='status-text'>AI Agent Online</span>
        </div>
      </div>
    </aside>
  )
}
