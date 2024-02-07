import React, { useState, useMemo } from 'react'
import IconPrev from '../assets/previous.svg?react'
import IconNext from '../assets/next.svg?react'
import Month from './Month'
import { CalMonth, CalWeek, CalDay } from '../types'
import { Locale, format, isSameDay, getWeek, subMonths, addMonths } from 'date-fns'
import { enUS } from 'date-fns/locale'

type Props = {
  activeDate?: Date,
  numberOfMonths?: number,
  prevEl?: React.ReactElement,
  nextEl?: React.ReactElement,
  locale?: Locale,
}

export default function Calendar({
  activeDate = new Date(),
  numberOfMonths = 1,
  prevEl = <IconPrev />,
  nextEl = <IconNext />,
  locale = enUS,
}: Props): React.ReactElement {

  const [currentDate, setCurrentDate] = useState(activeDate)

  /* Create an array of CalDay types */
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
      const month = currentDateNextMonth.getMonth()

      // Get the days in this month and divide them into weeks
      const days = getDaysInMonth(year, month)
      const weekNumbers = [...new Set(days.map(day => day.weekNumber))] // Get unique week numbers
      const weeks: CalWeek[] = []

      weekNumbers.forEach(weekNumber => {
        weeks.push({weekNumber: weekNumber, days: days.filter(day => day.weekNumber === weekNumber)})
      })

      monthItems.push({
        year: year,
        month: month,
        weeks: weeks
      })
    }

    return monthItems;
  }

  /* useMemo will only re-run the getMonths method when the currentDate or numberOfMonths changes */
  const months: CalMonth[] = useMemo(() => getMonths(currentDate, numberOfMonths), [currentDate, numberOfMonths]);

  /* Change the current month */
  const changeMonth = (direction: string) => {
    if (direction === 'prev') {
      setCurrentDate(subMonths(currentDate, 1))
    }
    else {
      setCurrentDate(addMonths(currentDate, 1))
    }
  }

  return (
    <div className={`cal-container ${numberOfMonths > 1 ? 'multiple' : 'single'}`}>

      <button className="cal-prev" onClick={() => changeMonth('prev')}>
        {prevEl}
      </button>

      <button className="cal-next" onClick={() => changeMonth('next')}>
        {nextEl}
      </button>

      {months.map((month, key) => (
        <Month key={key} month={month} locale={locale} />
      ))}

    </div>
  )
}
