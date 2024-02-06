export type CalMonth = {
  year: number
  month: number
  //weeks: CalWeek[]
  selectableDates?: Date[]
  activeDates?: Date[]
}

export type CalWeek = {
  weekNumber: number
  days: CalDay[]
}

export type CalDay = {
  date: Date
  dayOfTheWeek: number
  classNames?: string[]
}

export type Highlight = {
  dates?: Date[]
  dateRange?: Date[]
  names: string[]
}

export type DayClass = {
  day: number
  names: string[]
}
