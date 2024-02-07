import React from 'react'
import Week from './Week'
import { CalMonth } from '../types'
import { Locale, format } from 'date-fns'

type Props = {
  month: CalMonth
  locale: Locale,
}

export default function Month({
  month,
  locale,
}: Props): React.ReactElement {

  return (
    <div className="cal-month">
      <div className="cal-month-title">
        {format(month.weeks[0].days[0].date, 'LLLL', { locale: locale })} {format(month.weeks[0].days[0].date, 'yyyy', { locale: locale })}
      </div>
      {month.weeks.map(week => (
        <Week key={week.days[0].date.toString()} week={week} locale={locale} />
      ))}
    </div>
  )
}
