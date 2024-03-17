import React from 'react'
import ReactDOM from 'react-dom/client'
//import './styles.scss'
import './index.css'
import Calendar from './index'
import { nl, de, es } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h3 className="text-4xl font-bold pt-8 pb-2">Default</h3>
    <div style={{ marginBottom: '2rem' }}>
      <Calendar />
    </div>

    <h3 className="text-4xl font-bold pt-8 pb-2">Change month and year and all dates selectable</h3>
    <Calendar changeMonth={true} changeYear={true} selectable='all' />

    <h3 className="text-4xl font-bold pt-8 pb-2">2 Calendars - German - Set active date in Date format</h3>
    <Calendar numberOfMonths={2} locale={de} changeYear={true} active={new Date(2025, 3, 4)}/>

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Dutch - Set active date in string format</h3>
    <Calendar numberOfMonths={3} locale={nl} changeMonth={true} active='2026-10-16' />

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Spanish - Set active dates in Date format</h3>
    <Calendar numberOfMonths={3} locale={es} changeMonth={true} active={{dates: [new Date(2024, 5, 4), new Date(2024, 7, 3)]}} />

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Set active date range with Dates</h3>
    <Calendar numberOfMonths={3} active={{dateRange: [new Date(2024, 9, 3), new Date(2024, 9, 21)]}} />

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Selectable dates</h3>
    <Calendar
      numberOfMonths={3}
      active={new Date(2024, 5, 1)}
      selectable={
        {dates: [
          new Date(2024, 5, 3),
          new Date(2024, 5, 6),
          new Date(2024, 5, 8),
        ]}
      }
    />

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Selectable date range</h3>
    <Calendar
      numberOfMonths={3}
      active={new Date(2024, 9, 1)}
      selectable={
        {dateRanges: [new Date(2024, 9, 3), new Date(2024, 9, 21)]}
      }
    />

    <h3 className="text-4xl font-bold pt-8 pb-2">3 Calendars - Selectable date ranges</h3>
    <Calendar
      numberOfMonths={3}
      active={new Date(2024, 9, 1)}
      selectable={
        {dateRanges: [
          [new Date(2024, 9, 3), new Date(2024, 9, 21)],
          [new Date(2024, 10, 2), new Date(2024, 10, 18)],
        ]}
      }
    />

  </React.StrictMode>,
)
