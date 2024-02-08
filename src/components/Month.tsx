import React from 'react'
import Week from './Week'
import { CalMonth } from '../types'
import { Locale, format, eachDayOfInterval } from 'date-fns'

type Props = {
  month: CalMonth
  locale: Locale,
}

export default function Month({
  month,
  locale,
}: Props): React.ReactElement {

  const weekDays = () => {
    const firstDayOfTheWeek = month.weeks[1].days[0].date
    const lastDayOfTheWeek = month.weeks[1].days[6].date
    return eachDayOfInterval({ start: firstDayOfTheWeek, end: lastDayOfTheWeek })
  }

  return (
    <div className="cal-month">
      <div className="cal-month-title">
        {format(month.weeks[0].days[0].date, 'LLLL', { locale: locale })} {format(month.weeks[0].days[0].date, 'yyyy', { locale: locale })}
      </div>
      <div className="cal-weekdays">
        {weekDays().map((day, key) => (
          <div key={key} className="cal-weekday">
            {format(day, 'EEEEEE', { locale: locale })}
          </div>
        ))}
      </div>
      {month.weeks.map(week => (
        <Week key={week.days[0].date.toString()} week={week} locale={locale} />
      ))}
    </div>
  )
}
