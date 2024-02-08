import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.scss'
import Calendar from './index'
import { nl, de } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div style={{ marginBottom: '2rem' }}>
      <Calendar numberOfMonths={1} changeMonth={true} changeYear={true} />
    </div>
    <Calendar numberOfMonths={2} locale={de} changeYear={true} />
    <Calendar numberOfMonths={3} locale={nl} changeMonth={true} />
  </React.StrictMode>,
)
