import React from 'react'
import { Locale, format } from 'date-fns'

type Props = {
  year: number,
  month: number,
  locale: Locale,
}

export default function Month({
  year,
  month,
  locale,
}: Props): React.ReactElement {
  return (
    <div className="cal-month">
      <div className="cal-month-title">
        {format(new Date(year, month), 'LLLL', { locale: locale })} {year}
      </div>
     </div>
  )
}
