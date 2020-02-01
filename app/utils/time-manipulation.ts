import * as d3 from "d3"

export interface Time {
  h: number
  m: number
}
export interface TimeText {
  h: string
  m: string
}

// The radian of a complete circle
export const fullAngle = Math.PI * 2

// The radian of a Second/Minute
export const degreeRadian = fullAngle / 360

// The degree of 1 Hour
export const hourInDegrees = 360 / 12
// The degree of 1 Minute
export const minuteInDegrees = 360 / 60
// The degree of 1 Milisecond
export const milisecondsInDegrees = 360 / 60 / 1000

export const hourScale = d3
  .scaleLinear()
  .range([0, 11 * hourInDegrees])
  .domain([0, 11])

export const minuteScale = d3
  .scaleLinear()
  .range([0, 59 * minuteInDegrees])
  .domain([0, 59])
export const secondScale = minuteScale

export const milisecondScale = d3
  .scaleLinear()
  .range([0, 999 * milisecondsInDegrees])
  .domain([0, 999])

/**
 * Takes the full angle, divides by the total degrees of a circle,
 * and multiplies by the hourScale (in radian degrees) of the given time.
 */
export const calculateAngleFromTime = ({ h, m }: Time) =>
  (fullAngle / 360) * hourScale((h % 12) + m / 60)

export const calculateAngleFromHour = (hour: number): number => (Math.PI * hour) / 6

export const calculateMinutesFromAngle = (angle: number): number =>
  Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5

export const calculateTimeFromAngle = (angle: number): Time => {
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60)
  const m = minutes - h * 60

  return { h, m }
}

export const calculateMinutesFromTime = ({ h, m }: Time): number => h * 60 + m

export const calculateTimeFromMinutes = (minutes: number): Time => ({
  h: Math.floor(minutes / 60),
  m: minutes % 60,
})

export const roundAngleToFives = (angle: number): number => {
  const fiveMinuteAngle = ((2 * Math.PI) / 60) * 5

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle
}

export const padValue = (value: number): string => {
  if (`${value}`.length < 2) {
    return `0${value}`
  }
  return String(value)
}

export const padTime = ({ h, m }: Time): TimeText => ({
  h: padValue(h),
  m: padValue(m),
})

export const padMinutes = (min: number): string => {
  if (`${min}`.length < 2) {
    return `0${min}`
  }

  return String(min)
}
