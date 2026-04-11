'use client'

import { useState } from 'react'
import './calendar.css'

interface ScheduledTask {
  id: number
  title: string
  time: string
  date: string
  recurring: 'daily' | 'weekly' | 'monthly' | 'none'
}

const initialTasks: ScheduledTask[] = [
  { id: 1, title: 'Check emails', time: '09:00', date: '2026-04-11', recurring: 'daily' },
  { id: 2, title: 'Review task board', time: '10:00', date: '2026-04-11', recurring: 'daily' },
  { id: 3, title: 'Weekly sync', time: '14:00', date: '2026-04-13', recurring: 'weekly' },
  { id: 4, title: 'Memory review', time: '18:00', date: '2026-04-14', recurring: 'weekly' },
  { id: 5, title: 'Project planning', time: '10:00', date: '2026-04-15', recurring: 'monthly' },
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(11)

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

  const getTasksForDay = (day: number) => {
    const monthStr = String(month + 1).padStart(2, '0')
    const dayStr = String(day).padStart(2, '0')
    const dateStr = year + '-' + monthStr + '-' + dayStr
    return initialTasks.filter(t => t.date === dateStr)
  }

  const selectedTasks = selectedDay ? getTasksForDay(selectedDay) : []

  const renderDays = () => {
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={'empty-' + i} className='calendar-day empty'></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const tasks = getTasksForDay(day)
      const isToday = day === 11 && month === 3
      const isSelected = day === selectedDay
      days.push(
        <div
          key={day}
          className={'calendar-day ' + (isToday ? 'today ' : '') + (isSelected ? 'selected ' : '')}
          onClick={() => setSelectedDay(day)}
        >
          <span className='day-number'>{day}</span>
          <div className='day-tasks'>
            {tasks.slice(0, 2).map(task => (
              <div key={task.id} className='task-dot' title={task.title}></div>
            ))}
            {tasks.length > 2 && <span className='more-tasks'>+{tasks.length - 2}</span>}
          </div>
        </div>
      )
    }

    return days
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
            {selectedDay ? 'Tasks for Day ' + selectedDay : 'Select a Day'}
          </h3>
          {selectedDay ? (
            selectedTasks.length > 0 ? (
              <div className='task-list'>
                {selectedTasks.map(task => (
                  <div key={task.id} className='scheduled-task'>
                    <div className='task-info'>
                      <span className='task-title'>{task.title}</span>
                      <span className='task-time'>{task.time}</span>
                    </div>
                    <span className={'recurring-badge ' + task.recurring}>
                      {task.recurring === 'none' ? 'One-time' : task.recurring}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className='no-tasks'>No tasks scheduled</p>
            )
          ) : (
            <p className='no-tasks'>Click a day to see tasks</p>
          )}
        </div>
      </div>
    </div>
  )
}
