export const calculateAngleFromHour = (hour: number): number => (Math.PI * hour) / 6

export const calculateMinutesFromAngle = (angle: number): number =>
  Math.round(angle / ((2 * Math.PI) / (12 * 12))) * 5

export interface Time {
  h: number
  m: number
}
export interface TimeText {
  h: string
  m: string
}

export const calculateTimeFromAngle = (angle: number): Time => {
  const minutes = calculateMinutesFromAngle(angle)
  const h = Math.floor(minutes / 60)
  const m = minutes - h * 60

  return { h, m }
}

export const roundAngleToFives = (angle: number): number => {
  const fiveMinuteAngle = (2 * Math.PI) / 144

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
