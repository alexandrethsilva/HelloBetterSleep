import * as React from "react"
import * as d3 from "d3"
import { Circle, Svg, G, Line, Text as SvgText } from "react-native-svg"
import { View } from "react-native"
import { useObserver } from "mobx-react-lite"
import { clockStyles as styles, clockProps } from "./clock.styles"
import { useInterval } from "../../utils/use-interval"
import {
  secondScale,
  hourScale,
  minuteScale,
  milisecondScale,
  degreeRadian,
} from "../../utils/time-manipulation"

export interface ClockProps {
  clockRadius?: number
  height?: number
  width?: number
  margin?: number
  throttleTick?: boolean
  balanceHandSecond?: number
  handLengthHour?: number
  handLengthMinute?: number
  handLengthSecond?: number
  labelOffsetHour?: number
  labelOffsetSecond?: number
  labelRadiusHour?: number
  labelRadiusSecond?: number
  tickLengthHour?: number
  tickLengthSecond?: number
  tickStartHour?: number
  tickStartSecond?: number
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const Clock: React.FunctionComponent<ClockProps> = props => {
  // Clock Time Reference
  const [currentHour, setCurrentHour] = React.useState<number>(null)
  const [currentMinute, setCurrentMinute] = React.useState<number>(null)
  const [currentSecond, setCurrentSecond] = React.useState<number>(null)
  const [currentMilisecond, setCurrentMilisecond] = React.useState<number>(null)

  // Reference configuration parameters
  const { clockRadius = 100 } = props
  const { margin = clockRadius / 4 } = props
  const parsedClockProps = clockProps(clockRadius, margin)

  // Base configuration
  const {
    throttleTick = true, // Active for now. After the implementation will default to false
    height = (clockRadius + margin) * 2,
    width = (clockRadius + margin) * 2,
    balanceHandSecond = clockRadius / 6.7,
    handLengthHour = (clockRadius * 2) / 4,
    handLengthMinute = clockRadius - clockRadius / 10,
    handLengthSecond = clockRadius - clockRadius / 10,
    labelOffsetHour = clockRadius / 4 / 4,
    labelOffsetSecond = clockRadius / 40,
    labelRadiusHour = clockRadius - clockRadius / 4,
    labelRadiusSecond = clockRadius + clockRadius / 12.5,
    tickLengthHour = clockRadius / 11,
    tickLengthSecond = clockRadius / 20,
    tickStartHour = clockRadius - clockRadius / 50,
    tickStartSecond = clockRadius,
  } = props

  // The clock face center
  const clockFaceCenter = margin

  const updateHands = () => {
    const now = new Date()
    setCurrentHour((now.getHours() % 12) + now.getMinutes() / 60)
    setCurrentMinute(now.getMinutes())
    setCurrentSecond(now.getSeconds())
    setCurrentMilisecond(now.getMilliseconds())
  }

  const interval = throttleTick ? 1000 : 16
  React.useEffect(updateHands, [])
  useInterval(updateHands, interval)

  const handTransformHour = `rotate(${
    throttleTick ? hourScale(currentHour) : hourScale(currentHour)
  })`
  const handTransformMinute = `rotate(${
    throttleTick ? minuteScale(currentMinute) : minuteScale(currentMinute)
  })`
  const handTransformSecond = `rotate(${
    throttleTick
      ? secondScale(currentSecond)
      : secondScale(currentSecond) + milisecondScale(currentMilisecond)
  })`

  return useObserver(() => (
    <View style={styles.WRAPPER}>
      <Svg testID="clockCanvas" id="clock-canvas" height={height} width={width}>
        <Circle r={clockRadius} {...parsedClockProps.FACE_CANVAS}></Circle>
        <G
          id="clock-face"
          x={clockRadius}
          y={clockRadius}
          transform={`translate(${clockFaceCenter}, ${clockFaceCenter})`}
        >
          {/* Add the second markers */}
          {d3.range(0, 60).map((second, index) => (
            <Line
              key={index}
              x1={0}
              x2={0}
              y1={tickStartSecond}
              y2={tickStartSecond - tickLengthSecond}
              transform={`rotate(${secondScale(second)})`}
              {...parsedClockProps.TICK_SECOND}
            ></Line>
          ))}
          {/* Add the second/minute labels */}
          {/* Here we start at 5 because we want to skip the 0 marker, and do it for every 5 seconds/minutes */}
          {d3.range(5, 61, 5).map((label, index) => (
            <SvgText
              key={index}
              x={labelRadiusSecond * Math.sin(secondScale(label) * degreeRadian)}
              y={
                -labelRadiusSecond * Math.cos(secondScale(label) * degreeRadian) + labelOffsetSecond
              }
              {...parsedClockProps.LABEL_SECOND}
            >
              {label}
            </SvgText>
          ))}
          {/* Add the hour markers */}
          {d3.range(0, 12).map((hour, index) => (
            <Line
              key={index}
              x1={0}
              x2={0}
              y1={tickStartHour}
              y2={tickStartHour - tickLengthHour}
              transform={`rotate(${hourScale(hour)})`}
              {...parsedClockProps.TICK_HOUR}
            ></Line>
          ))}
          {/* Add the hour labels */}
          {/* Here we start at 3 because we want to skip the 0 marker, and do it for every 3 hours */}
          {d3.range(3, 13, 3).map((label, index) => (
            <SvgText
              key={index}
              x={labelRadiusHour * Math.sin(hourScale(label) * degreeRadian)}
              y={-labelRadiusHour * Math.cos(hourScale(label) * degreeRadian) + labelOffsetHour}
              {...parsedClockProps.LABEL_HOUR}
            >
              {label}
            </SvgText>
          ))}
          <G id="clock-face-overlay" x={0} y={0} r={clockRadius}>
            <Line
              id="clock-face-overlay-hour"
              x1={0}
              x2={0}
              y2={-handLengthHour}
              transform={handTransformHour}
              {...parsedClockProps.HAND_HOUR_BAR_STROKE}
            ></Line>
            <Line
              id="clock-face-overlay-hour"
              x1={0}
              x2={0}
              y1={0}
              y2={-handLengthHour}
              transform={handTransformHour}
              {...parsedClockProps.HAND_HOUR_LINE}
            ></Line>
            <Line
              id="clock-face-overlay-hour"
              x1={0}
              x2={0}
              y2={-handLengthHour}
              transform={handTransformHour}
              {...parsedClockProps.HAND_HOUR_BAR}
            ></Line>
            <Line
              id="clock-face-overlay-minute"
              x1={0}
              x2={0}
              y1={0}
              y2={-handLengthMinute}
              transform={handTransformMinute}
              {...parsedClockProps.HAND_MINUTE_LINE}
            ></Line>
            <Line
              id="clock-face-overlay-minute"
              x1={0}
              x2={0}
              y1={0}
              y2={-handLengthMinute}
              transform={handTransformMinute}
              {...parsedClockProps.HAND_MINUTE_BAR_STROKE}
            ></Line>
            <Line
              id="clock-face-overlay-minute"
              x1={0}
              x2={0}
              y1={0}
              y2={-handLengthMinute}
              transform={handTransformMinute}
              {...parsedClockProps.HAND_MINUTE_BAR}
            ></Line>
            <Circle id="clock-face-screw" {...parsedClockProps.CENTER_SCREW}></Circle>
            <Line
              id="clock-face-overlay-second"
              x1={0}
              x2={0}
              y1={balanceHandSecond}
              y2={-handLengthSecond}
              transform={handTransformSecond}
              {...parsedClockProps.HAND_SECOND}
            ></Line>
            <Circle id="clock-face-screw" {...parsedClockProps.CENTER_SCREW_PIN}></Circle>
          </G>
        </G>
      </Svg>
    </View>
  ))
}
