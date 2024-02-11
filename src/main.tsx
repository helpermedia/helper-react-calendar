import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.scss'
import Calendar from './index'
import { nl, de, es } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ marginBottom: '2rem' }}>
      <Calendar numberOfMonths={1} changeMonth={true} changeYear={true} />
    </div>
    <Calendar numberOfMonths={2} locale={de} changeYear={true} active={new Date(2025, 3, 4)}/>
    <Calendar numberOfMonths={3} locale={nl} changeMonth={true} active='2026-10-16' />
    <Calendar numberOfMonths={3} locale={es} changeMonth={true} active={{dates: [new Date(2024, 5, 4), new Date(2024, 7, 3)]}} />
    <Calendar numberOfMonths={3} active={{dateRange: [new Date(2024, 8, 3), new Date(2024, 10, 7)]}} />
  </React.StrictMode>,
)
