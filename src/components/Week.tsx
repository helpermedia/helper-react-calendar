import React from 'react'
import { CalWeek } from '../types'
import { Locale, format } from 'date-fns'

type Props = {
  week: CalWeek
  locale: Locale
}

export default function Month({
  week,
  locale
}: Props): React.ReactElement {

  // Add empty days to the beginning of end the week
  const emptyDays = (position: string) => {
    const emptyDays = []
    let numberOfDays = 0
    if (position === 'begin') {
      numberOfDays = week.days[0].dayOfTheWeek - 1
    }
    else {
      numberOfDays = 7 - week.days[week.days.length - 1].dayOfTheWeek
    }
    for (let i = 0; i < numberOfDays; i++) {
      emptyDays.push(<div key={i + 1} className="cal-day empty"></div>)
    }
    return emptyDays
  }

  return (
    <div className={`grid grid-cols-7 text-center week-${week.weekNumber}`}>
      {emptyDays('begin')}

      {week.days.map(day => (
        <div key={day.dayOfTheWeek} className={`py-2 ${day.classNames?.join(' ')}`}>
          {format(day.date, 'd', { locale: locale })}
        </div>
      ))}

      {emptyDays('end')}
    </div>
  )
}
