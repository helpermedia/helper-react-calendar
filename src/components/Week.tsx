import React from 'react'
import { CalWeek } from '../types'
import { Locale, format } from 'date-fns'

type Props = {
  week: CalWeek
  locale: Locale,
}

export default function Month({
  week,
  locale
}: Props): React.ReactElement {

  return (
    <div className={`cal-week week-${week.weekNumber}`}>
      {week.days.map(day => (
        <div key={day.date.toString()} className="cal-day">
          {format(day.date, 'd', { locale: locale })}
        </div>
      ))}
    </div>
  )
}
