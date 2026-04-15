'use client'

export default function Office() {
  return (
    <div className='office-page'>
      <div className='page-header'>
        <h1>Office</h1>
        <p>2D visualization of your AI agents at work</p>
      </div>

      <div className='card' style={{ textAlign: 'center', padding: '60px' }}>
        <h2 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          The Office visualization will show your AI agents working in real-time.
          <br /><br />
          To enable this, we need to set up the agent runner system that tracks
          <br />
          what each sub-agent is working on.
        </p>
        <div style={{ 
          background: 'var(--bg-tertiary)', 
          padding: '20px', 
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
            <strong>Next step:</strong> Build the agent runner system<br />
            to track agent activity and display it here
          </p>
        </div>
      </div>
    </div>
  )
}
