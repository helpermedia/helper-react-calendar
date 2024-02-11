import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.scss'
import Calendar from './index'
import { nl, de, es } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h3>Default</h3>
    <div style={{ marginBottom: '2rem' }}>
      <Calendar />
    </div>
    <h3>Change month and year</h3>
    <div style={{ marginBottom: '2rem' }}>
      <Calendar changeMonth={true} changeYear={true} />
    </div>
    <h3>2 Calendars - German - Set active date in Date format</h3>
    <Calendar numberOfMonths={2} locale={de} changeYear={true} active={new Date(2025, 3, 4)}/>
    <h3>3 Calendars - Dutch - Set active date in string format</h3>
    <Calendar numberOfMonths={3} locale={nl} changeMonth={true} active='2026-10-16' />
    <h3>3 Calendars - Spanish - Set active dates in Date format</h3>
    <Calendar numberOfMonths={3} locale={es} changeMonth={true} active={{dates: [new Date(2024, 5, 4), new Date(2024, 7, 3)]}} />
    <h3>3 Calendars - Set active date range with Dates</h3>
    <Calendar numberOfMonths={3} active={{dateRange: [new Date(2024, 8, 3), new Date(2024, 10, 7)]}} />
  </React.StrictMode>,
)
