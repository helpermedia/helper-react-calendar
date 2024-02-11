import React from 'react'
import Week from './Week'
import { CalMonth } from '../types'
import { Locale, format, eachDayOfInterval } from 'date-fns'

type Props = {
  month: CalMonth
  locale: Locale
  changeMonth: boolean
  changeYear: boolean
  onSelectMonth: (year: number) => void
  onSelectYear: (year: number) => void
}

export default function Month({
  month,
  locale,
  changeMonth,
  changeYear,
  onSelectMonth,
  onSelectYear,
}: Props): React.ReactElement {

   /* Get names of days of the week */
  const getWeekDayNames = () => {
    const firstDayOfTheWeek = month.weeks[1].days[0].date
    const lastDayOfTheWeek = month.weeks[1].days[6].date
    return eachDayOfInterval({ start: firstDayOfTheWeek, end: lastDayOfTheWeek })
  }

  /* Get names of months */
  const getMonthNames = () => {
    const months = []
    for (let i = 0; i <= 11; i++) {
      months.push({month: i, name: format(new Date(month.year, i), 'LLLL', { locale: locale })})
    }
    return months
  }

  /* Get years */
  const getYears = () => {
    const years = []
    for (let i = month.year - 10; i <= month.year + 10; i++) {
      years.push(i)
    }
    return years
  }

  return (
    <div className="cal-month">
      <div className="cal-month-title">
        {changeMonth ? (
          <select
            onChange={e => onSelectMonth(parseInt(e.target.value))}
            value={month.monthIndex}
          >
            {getMonthNames().map((item, key) => {
              return <option value={item.month} key={key}>{item.name}</option>
            })}
          </select>
        ) : (
          <span>
            {format(month.weeks[0].days[0].date, 'LLLL', { locale: locale })}
          </span>
        )}
        {!changeMonth || !changeYear ? <span>&nbsp;</span> : ''}
        {changeYear ? (
          <select
            onChange={e => onSelectYear(parseInt(e.target.value))}
            value={month.year}
          >
            {getYears().map((year) => {
              return <option style={{fontSize: '1rem'}} value={year} key={year}>{year}</option>
            })}
          </select>
        ) : (
          <span>
            {format(month.weeks[0].days[0].date, 'yyyy', { locale: locale })}
          </span>
        )}
      </div>
      <div className="cal-weekdays">
        {getWeekDayNames().map((day, key) => (
          <div key={key} className="cal-weekday">
            {format(day, 'EEEEEE', { locale: locale })}
          </div>
        ))}
      </div>
      {month.weeks.map(week => (
        <Week
          key={week.days[0].date.toString()}
          week={week}
          locale={locale} />
      ))}
    </div>
  )
}
