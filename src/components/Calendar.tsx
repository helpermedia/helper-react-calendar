import React, { useState, useMemo } from 'react'
import IconPrev from '../assets/previous.svg?react'
import IconNext from '../assets/next.svg?react'
import Month from './Month'
import { CalMonth } from '../types'
import { Locale, subMonths, addMonths } from 'date-fns'
import enUS from 'date-fns/locale/en-US'

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

  /* Create an array of CalMonth objects */
  const getMonths = (currentDate: Date, numberOfMonths: number) => {
    const monthItems: CalMonth[] = []

    for (let i = 0; i < numberOfMonths; i++) {
      const currentDateNextMonth = addMonths(currentDate, i)
      monthItems.push({
        year: currentDateNextMonth.getFullYear(),
        month: currentDateNextMonth.getMonth()
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
        <Month key={key} year={month.year} month={month.month} locale={locale} />
      ))}

    </div>
  )
}
