import React from 'react'
import IconPrev from '../assets/previous.svg?react'
import IconNext from '../assets/next.svg?react'

type Props = {
  prevEl?: React.ReactElement,
  nextEl?: React.ReactElement,
}

export default function Calendar({
  prevEl = <IconPrev />,
  nextEl = <IconNext />,
}: Props): React.ReactElement {

  return (
    <div className="cal-container">
      <button className="cal-prev" onClick={() => console.log('prev')}>{prevEl}</button>
      <button className="cal-next" onClick={() => console.log('next')}>{nextEl}</button>
    </div>
  )
}
