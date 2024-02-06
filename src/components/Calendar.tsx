import React from 'react'
import IconPrev from '../assets/previous.svg?react'
import IconNext from '../assets/next.svg?react'
import Month from './Month'
//import { CalMonth, CalWeek, CalDay } from '../types'

type Props = {
  activeDate?: Date,
  prevEl?: React.ReactElement,
  nextEl?: React.ReactElement,
}

export default function Calendar({
  activeDate = new Date(),
  prevEl = <IconPrev />,
  nextEl = <IconNext />,
}: Props): React.ReactElement {

  return (
    <div className="cal-container">
      <button className="cal-prev" onClick={() => console.log('prev')}>{prevEl}</button>
      <button className="cal-next" onClick={() => console.log('next')}>{nextEl}</button>
      <Month year={activeDate.getFullYear()} month={activeDate.getMonth()} />
    </div>
  )
}
