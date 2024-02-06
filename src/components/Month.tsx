import React from 'react'

type Props = {
  year: number,
  month: number,
}

export default function Month({
  year,
  month,
}: Props): React.ReactElement {
  return (
    <div className="cal-month">
      <h2>{year}</h2>
      <h3>{month + 1}</h3>
     </div>
  )
}
