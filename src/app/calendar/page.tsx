'use client'

import { useState, useEffect } from 'react'
import './calendar.css'

interface CalendarEvent {
  id: number
  title: string
  time: string
  date: string
  recurring: 'daily' | 'weekly' | 'monthly' | 'none'
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 15))
  const [selectedDay, setSelectedDay] = useState<number | null>(15)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setEvents(data.events || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDay(null)
  }
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDay(null)
  }

  const getEventsForDay = (day: number) => {
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const dateStr = year + '-' + monthStr + '-' + dayStr
    return events.filter(e => e.date === dateStr)
  }

  const selectedEvents = selectedDay ? getEventsForDay(selectedDay) : []

  const renderDays = () => {
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={'empty-' + i} className='calendar-day empty'></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day)
      const isToday = day === 15 && month === 3
      const isSelected = day === selectedDay
      days.push(
        <div
          key={day}
          className={'calendar-day ' + (isToday ? 'today ' : '') + (isSelected ? 'selected ' : '')}
          onClick={() => setSelectedDay(day)}
        >
          <span className='day-number'>{day}</span>
          <div className='day-tasks'>
            {dayEvents.slice(0, 2).map(event => (
              <div key={event.id} className='event-dot' title={event.title}></div>
            ))}
            {dayEvents.length > 2 && <span className='more-tasks'>+{dayEvents.length - 2}</span>}
          </div>
        </div>
      )
    }

    return days
  }

  if (loading) {
    return <div className='calendar-page'><p>Loading...</p></div>
  }
return (
    <div className='calendar-page'>
      <div className='page-header'>
        <h1>Calendar</h1>
        <p>View all scheduled cron jobs and proactive tasks</p>
      </div>

      <div className='calendar-container'>
        <div className='calendar-card'>
          <div className='calendar-header'>
            <button onClick={prevMonth} className='nav-btn'>prev</button>
            <h2>{monthNames[month]} {year}</h2>
            <button onClick={nextMonth} className='nav-btn'>next</button>
          </div>
          <div className='calendar-grid'>
            {weekDays.map(day => (
              <div key={day} className='weekday'>{day}</div>
            ))}
            {renderDays()}
          </div>
        </div>

        <div className='scheduled-tasks card'>
          <h3 className='card-title'>
            {selectedDay ? 'Events for Day ' + selectedDay : 'Select a Day'}
          </h3>
          {selectedDay ? (
            selectedEvents.length > 0 ? (
              <div className='task-list'>
                {selectedEvents.map(event => (
                  <div key={event.id} className='scheduled-task'>
                    <div className='task-info'>
                      <span className='task-title'>{event.title}</span>
                      <span className='task-time'>{event.time}</span>
                    </div>
                    <span className={'recurring-badge ' + event.recurring}>
                      {event.recurring === 'none' ? 'One-time' : event.recurring}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className='no-tasks'>No events scheduled</p>
            )
          ) : (
            <p className='no-tasks'>Click a day to see events</p>
          )}
        </div>
      </div>
    </div>
  )
}
