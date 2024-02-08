export type CalMonth = {
  year: number
  monthIndex: number
  weeks: CalWeek[]
}

export type CalWeek = {
  weekNumber: number
  days: CalDay[]
}

export type CalDay = {
  date: Date
  dayOfTheWeek: number
  weekNumber: number
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
