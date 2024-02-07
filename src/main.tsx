import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.scss'
import Calendar from './index'
import { nl } from 'date-fns/locale'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Calendar numberOfMonths={3} locale={nl}/>
  </React.StrictMode>,
)
