import * as React from "react"
import * as d3 from "d3"
import { Circle, Svg, Path } from "react-native-svg"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { useStores } from "../../models/root-store"
import { sleepDialStyles, sleepDialProps } from "./sleep-dial.styles"
import { Clock } from ".."
import { hourScale, calculateAngleFromTime, minuteScale } from "../../utils/time-manipulation"
import { DefaultArcObject } from "d3"

export interface SleepDialProps {
  displayClock?: boolean
  height?: number
  width?: number
  sleepDialRadius?: number
  step?: number
  trackWidth?: number
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const SleepDial: React.FunctionComponent<SleepDialProps> = props => {
  const { bedtimeStore } = useStores()
  const {
    schedule, // : { start, end },
  } = bedtimeStore

  /**
   * Se SH > 6 -> SH
   * Se SH = 6 -> -SH
   * Se SH < 6 -> -(12 - SH)
   */
  const hourStart = { h: 6, m: 50 }
  const hourEnd = { h: 6, m: 15 }
  const parsedHourStart = ({ h: hourStart, m: minuteStart }, { h: hourEnd, m: minuteEnd }) => {
    const hourAngleStart = hourScale(hourStart) + minuteScale(minuteStart) / 60
    const hourAngleEnd = hourScale(hourEnd) + minuteScale(minuteEnd) / 60

    console.tron.log("HAS", hourAngleStart)
    console.tron.log("HAE", hourAngleEnd)

    return hourAngleStart > hourAngleEnd
      ? // 👆🏽If the sleep hour is beyond 6, we just return it
        { h: hourStart, m: minuteStart }
      : hourAngleStart === hourAngleEnd
      ? // 👆🏽If the sleep hour is at six, we return the negative
        // as we want the cauge to show the sleep time going forward
        { h: -hourStart, m: minuteStart }
      : hourAngleStart < hourAngleEnd && hourAngleStart >= hourAngleEnd % 360
      ? // 👆🏽 If the sleep
        { h: -(12 - hourStart), m: minuteStart }
      : { h: hourStart, m: minuteStart }
  }

  const parsedHourEnd = ({ h: hourStart, m: minuteStart }, { h: hourEnd, m: minuteEnd }) => {
    const hourAngleStart = hourScale(hourStart) + minuteScale(minuteStart) / 60
    const hourAngleEnd = hourScale(hourEnd) + minuteScale(minuteEnd) / 60

    console.tron.log("HAS", hourAngleStart)
    console.tron.log("HAE", hourAngleEnd)

    return hourAngleStart > hourAngleEnd
      ? // 👆🏽If the sleep hour is beyond 6, we just return it
        { h: hourEnd, m: minuteEnd }
      : hourAngleStart === hourAngleEnd
      ? // 👆🏽If the sleep hour is at six, we return the negative
        // as we want the cauge to show the sleep time going forward
        { h: -hourEnd, m: minuteEnd }
      : hourAngleStart < hourAngleEnd && hourAngleStart >= hourAngleEnd % 360
      ? // 👆🏽 If the sleep
        { h: -(12 - hourEnd), m: minuteEnd }
      : { h: hourEnd, m: minuteEnd }
  }
  console.tron.log(parsedHourStart(hourStart, hourEnd))
  // const parsedHourStart = (hourStart, hourEnd) => (hourStart > 6 ? hourStart : hourStart === 6 ? -hourStart : hourStart < 6 && hourStart >= hourEnd ? -(12 - hourStart) : hourStart)
  // const start = { h: -7, m: 0 }
  const start = parsedHourStart(hourStart, hourEnd)
  const end = parsedHourEnd(hourStart, hourEnd)

  // Reference configuration parameters
  const { displayClock = true, sleepDialRadius = 150, trackWidth = 40 } = props

  // Base configuration
  const {
    height = (sleepDialRadius + trackWidth) * 2,
    width = (sleepDialRadius + trackWidth) * 2,
    step = 5,
  } = props

  const parsedSleepDialStyles = sleepDialStyles(sleepDialRadius, trackWidth)
  const parsedSleepDialProps = sleepDialProps(sleepDialRadius, trackWidth)

  const startAngle = { h: start.h % 12 > 6 ? (start.h % 12) - 12 : start.h % 12, m: start.m }
  const endAngle = { h: end.h % 12, m: end.m }

  const sleepDialArcOptions: DefaultArcObject = {
    innerRadius: sleepDialRadius + 2 - trackWidth / 2,
    outerRadius: sleepDialRadius - 2 + trackWidth / 2,
    // startAngle and endAngle are measured clockwise from the 12 o’clock in radians
    startAngle: calculateAngleFromTime(startAngle),
    endAngle: calculateAngleFromTime(endAngle),
  }
  const sleepDialArc = d3.arc()(sleepDialArcOptions)

  console.tron.logImportant(sleepDialArcOptions)

  return useObserver(() => (
    <View style={parsedSleepDialStyles.WRAPPER}>
      <View {...parsedSleepDialStyles.ABSOLUTE}>
        <Svg testID="sleepDial" id="sleep-dial" height={height} width={width}>
          <Circle r={sleepDialRadius} {...parsedSleepDialProps.DIAL_TRACK}></Circle>
          <Path
            d={sleepDialArc}
            transform={`translate(${sleepDialRadius + trackWidth / 2}, ${sleepDialRadius +
              trackWidth})`}
            {...parsedSleepDialProps.DIAL_ARC}
          ></Path>
        </Svg>
      </View>
      {displayClock ? (
        <View {...parsedSleepDialStyles.ABSOLUTE}>
          <View {...parsedSleepDialProps.CLOCK}>
            <Clock clockRadius={sleepDialRadius - trackWidth} margin={trackWidth * 1.5} />
          </View>
        </View>
      ) : null}
    </View>
  ))
}
