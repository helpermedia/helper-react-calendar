import React, { useState, useMemo } from 'react'
import IconPrev from '../assets/previous.svg?react'
import IconNext from '../assets/next.svg?react'
import Month from './Month'
import { CalMonth, CalWeek, CalDay } from '../types'
import { Locale, format, isSameDay, getWeek, addMonths } from 'date-fns'
import { enUS } from 'date-fns/locale'

type Props = {
  active?: Date | string | { dates: Date[] } | { dateRange: Date[] }
  selectable?: { dates?: Date[], dateRange?: Date[] }
  numberOfMonths?: number
  changeMonth?: boolean
  changeYear?: boolean
  prevEl?: React.ReactElement
  nextEl?: React.ReactElement
  locale?: Locale
}

/* Create an array of CalDay types in a month */
const getDaysInMonth = (year: number, month: number): CalDay[] => {
  const days = []
  const day = new Date(year, month, 1)
  while (parseInt(format(day, 'MM')) === month + 1) {
    const classNames: string[] = []
    if (isSameDay(new Date(), day)) {
      classNames.push('today')
    }

    days.push({
      date: new Date(day),
      dayOfTheWeek: day.getDay() ? day.getDay() : 7,
      weekNumber: getWeek(day, {weekStartsOn: 1}),
      classNames: classNames,
    })

    day.setDate(day.getDate() + 1)
  }
  return days
}

/* Create an array of CalMonth types */
const getMonths = (currentDate: Date, numberOfMonths: number) => {
  const monthItems: CalMonth[] = []

  for (let i = 0; i < numberOfMonths; i++) {
    const currentDateNextMonth = addMonths(currentDate, i)
    const year = currentDateNextMonth.getFullYear()
    const monthIndex = currentDateNextMonth.getMonth()

    // Get the days in this month and divide them into weeks
    const days = getDaysInMonth(year, monthIndex)
    const weekNumbers = [...new Set(days.map(day => day.weekNumber))] // Get unique week numbers
    const weeks: CalWeek[] = []

    weekNumbers.forEach(weekNumber => {
      weeks.push({weekNumber: weekNumber, days: days.filter(day => day.weekNumber === weekNumber)})
    })

    monthItems.push({
      year: year,
      monthIndex: monthIndex,
      weeks: weeks
    })
  }

  return monthItems;
}

/* Return array of all active dates */
const getActiveDates = (active: Date | string | { dates: Date[] } | { dateRange: Date[] }) => {
  if (active instanceof Date) {
    return [active]
  }
  else if (typeof active === 'string') {
    return [new Date(active)]
  }
  else if (active && 'dates' in active) {
    return active.dates
  }
  else if (active && 'dateRange' in active) {
    // Generate an array of dates between the start and end date
    const dates = []
    const startDate = active.dateRange[0]
    const endDate = active.dateRange[1]
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d))
    }
    return dates
  }
  else {
    return [new Date()]
  }
}

export default function Calendar({
  active = new Date(),
  numberOfMonths = 1,
  changeMonth = false,
  changeYear = false,
  prevEl = <IconPrev />,
  nextEl = <IconNext />,
  locale = enUS,
}: Props): React.ReactElement {

  const [currentDate, setCurrentDate] = useState<Date>(getActiveDates(active)[0])

  /* useMemo will only re-run the getMonths method when the currentDate or numberOfMonths changes */
  const months: CalMonth[] = useMemo(() => getMonths(currentDate, numberOfMonths), [currentDate, numberOfMonths])

  /* useMemo will only re-run the getActiveDates method when the active prop changes */
  const activeDates: Date[] = useMemo(() => getActiveDates(active), [active])

  /* Filter active dates for a specific month */
  const getActiveDatesInMonth = (month: CalMonth) => {
    return activeDates.filter(
      date => date.getFullYear() === month.year &&
              date.getMonth() === month.monthIndex)
  }

  /* Change the current month */
  const onSelectMonth = (selectedMonth: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), selectedMonth, 1))
  }

  /* Change the current year */
  const onSelectYear = (selectedYear: number) => {
    setCurrentDate(new Date(selectedYear, currentDate.getMonth(), 1))
  }

  return (
    <div className={`cal-container ${numberOfMonths > 1 ? 'multiple' : 'single'}${numberOfMonths === 2 ? ' months-2' : ''}`}>

      <button className="cal-prev" onClick={() => onSelectMonth(currentDate.getMonth() - 1)}>
        {prevEl}
      </button>

      <button className="cal-next" onClick={() => onSelectMonth(currentDate.getMonth() + 1)}>
        {nextEl}
      </button>

      {months.map((month, key) => (
        <Month
          key={key}
          month={month}
          locale={locale}
          changeMonth={key === 0 ? changeMonth : false}
          changeYear={key === 0 ? changeYear : false}
          onSelectMonth={onSelectMonth}
          onSelectYear={onSelectYear}
        />
      ))}

    </div>
  )
}
