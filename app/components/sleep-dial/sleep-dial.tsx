import * as React from "react"
import * as d3 from "d3"
import { Circle, G, Path, Svg } from "react-native-svg"
import { View, PanResponder } from "react-native"
import { useObserver } from "mobx-react-lite"
import { useStores } from "../../models/root-store"
import { sleepDialStyles, sleepDialProps } from "./sleep-dial.styles"
import { Clock } from ".."
import {
  calculateAngleFromTime,
  calculateTimeFromAngle,
  fullAngle,
} from "../../utils/time-manipulation"
import { SleepTimeDisplay } from "../sleep-time-display/sleep-time-display"
import Ionicon from "react-native-vector-icons/Ionicons"
import { commonStyles } from "../../styles"

export interface SleepDialProps {
  displayClock?: boolean
  height?: number
  width?: number
  sleepDialRadius?: number
  trackWidth?: number
}

/**
 * React.FunctionComponent for your hook(s) needs
 *
 * Component description here for TypeScript tips.
 */
export const SleepDial: React.FunctionComponent<SleepDialProps> = props => {
  const { bedtimeStore } = useStores()
  const { schedule } = bedtimeStore
  const { start: bedtime, startInMinutes, end: waketime, endInMinutes } = schedule

  const [isUpdating, setIsUpdating] = React.useState(false)
  const [sleepDialComponentCenter, setSleepDialComponentCenter] = React.useState({ x: 0, y: 0 })

  // Reference configuration parameters
  const { displayClock = true, sleepDialRadius = 150 } = props
  const { trackWidth = sleepDialRadius / 3 } = props

  // Base configuration
  const {
    height = (sleepDialRadius + trackWidth) * 2,
    width = (sleepDialRadius + trackWidth) * 2,
  } = props

  /**
   * Here we set the coordinates of the center of the dial
   * in relation to itself, as the dependent values have their
   * positions based on the component size
   */
  const sleepDialLocalCenter = { x: width / 2 - trackWidth / 2, y: height / 2 }

  /**
   * Here we capture the coordinates of the center of the dial
   * as it has to be calculated according to its position on the
   * specific screen it's being displayed on
   */
  let sleepDialRef
  React.useEffect(() => {
    setTimeout(() => {
      sleepDialRef.measure((x, y, w, h, px, py) => {
        setSleepDialComponentCenter({ x: px + width / 2, y: py + height / 2 })
      })
      /**
       * RN mounts navigation components immediately, affecting the measure
       * so we currently add a timeout to calculate the screen size a little
       * while after the screen comes in
       */
    }, 600)
  }, [])

  const parsedSleepDialStyles = sleepDialStyles(schedule.isActive, sleepDialRadius, trackWidth)
  const parsedSleepDialProps = sleepDialProps(schedule.isActive, sleepDialRadius, trackWidth)

  const sleepPanResponder = PanResponder.create({
    // Ask to be the responder
    onStartShouldSetPanResponder: () => schedule.isActive,
    onStartShouldSetPanResponderCapture: () => schedule.isActive,
    onMoveShouldSetPanResponder: () => schedule.isActive,
    onMoveShouldSetPanResponderCapture: () => schedule.isActive,

    // Show feedback that the gesture has been recognised
    onPanResponderGrant: () => {
      setIsUpdating(true)
    },

    onPanResponderRelease: () => {
      setIsUpdating(false)
    },

    // Triggered on every change in the X, Y coordinate of the gesture
    onPanResponderMove: (_, { moveX, moveY }) => {
      const movementAngle =
        Math.atan2(moveY - sleepDialComponentCenter.y, moveX - sleepDialComponentCenter.x) +
        Math.PI / 2

      const parsedMovementAngle = movementAngle < 0 ? movementAngle + fullAngle : movementAngle

      return schedule.setScheduledTime({
        start: calculateTimeFromAngle(parsedMovementAngle),
        end: schedule.end,
      })
    },
  })

  const wakePanResponder = PanResponder.create({
    // Ask to be the responder
    onStartShouldSetPanResponder: () => schedule.isActive,
    onStartShouldSetPanResponderCapture: () => schedule.isActive,
    onMoveShouldSetPanResponder: () => schedule.isActive,
    onMoveShouldSetPanResponderCapture: () => schedule.isActive,

    // Show feedback that the gesture has been recognised
    onPanResponderGrant: () => {
      setIsUpdating(true)
    },

    onPanResponderRelease: () => {
      setIsUpdating(false)
    },

    // Triggered on every change in the X, Y coordinate of the gesture
    onPanResponderMove: (_, { moveX, moveY }) => {
      const movementAngle =
        Math.atan2(moveY - sleepDialComponentCenter.y, moveX - sleepDialComponentCenter.x) +
        Math.PI / 2

      const parsedMovementAngle = movementAngle < 0 ? movementAngle + fullAngle : movementAngle

      return schedule.setScheduledTime({
        start: schedule.start,
        end: calculateTimeFromAngle(parsedMovementAngle),
      })
    },
  })

  const bedtimeAngle = calculateAngleFromTime(bedtime)
  const waketimeAngle = calculateAngleFromTime(waketime)

  let startAngle: number
  let endAngle: number

  if (startInMinutes > endInMinutes && startInMinutes !== 0 && endInMinutes !== 0) {
    // startAngle is based on the bedtime
    // If greater than 180, we should make the angle the negative of the difference between bedtimeAngle and 360
    // Otherwise, pass it on
    /**
     * Reminder: angles are measured clockwise from the 12 o’clock in radians
     * The startAngle is based on:
     *  - if the bedtimeAngle is 0, we can just pass it on, as the arc can start here
     *  - if the bedtimeAngle is over the half angle (PI), then we want the negative difference between a full angle and bedtimeAngle
     *  - otherwise, we can express it as being a negative value of the bedtimeAngle subtracted from a full angle
     *
     * The endAngle is based on:
     *  - if waketimeAngle is 0, then we return a full angle instead, so that the arc ends at it
     *  - if the waketimeAngle is over the half angle (PI), than we do the difference between it and a full angle
     *  - otherwise we just pass it on, as the value here can be positive
     */
    startAngle =
      bedtimeAngle === 0
        ? bedtimeAngle
        : bedtimeAngle > Math.PI
          ? -(fullAngle % bedtimeAngle)
          : -(fullAngle - bedtimeAngle)
    endAngle = waketimeAngle
  } else {
    /**
     * Reminder: angles are measured clockwise from the 12 o’clock in radians
     * The startAngle is based on:
     *  - if the bedtimeAngle is over the half angle (PI), then we want the difference between it and a full angle
     *  - otherwise it can be expressed as a positive value, so we pass it on
     *
     * The endAngle is based on:
     *  - if waketimeAngle is 0, then we return a full angle instead, so that the arc ends at it
     *  - if the waketimeAngle is over the half angle (PI), than we do the difference between it and a full angle
     *  - otherwise we just pass it on, as the value here can be positive
     */
    startAngle = bedtimeAngle > Math.PI ? bedtimeAngle % fullAngle : bedtimeAngle
    endAngle =
      waketimeAngle === 0
        ? fullAngle
        : waketimeAngle > Math.PI
          ? waketimeAngle % fullAngle
          : waketimeAngle
  }

  const sleepDialArcOptions: d3.DefaultArcObject = {
    innerRadius: sleepDialRadius + 2 - trackWidth / 2,
    outerRadius: sleepDialRadius - 2 + trackWidth / 2,
    /**
     * Both angles are measured clockwise from the 12 o’clock in radians
     */
    startAngle,
    endAngle,
  }
  const sleepDialArc = d3.arc()(sleepDialArcOptions)

  const panHandleTransformStart = {
    x: sleepDialLocalCenter.x + Math.sin(-startAngle + Math.PI) * sleepDialRadius,
    y: sleepDialLocalCenter.y + Math.cos(-startAngle + Math.PI) * sleepDialRadius,
  }

  const panHandleTransformEnd = {
    x: sleepDialLocalCenter.x + Math.sin(-endAngle + Math.PI) * sleepDialRadius,
    y: sleepDialLocalCenter.y + Math.cos(endAngle + Math.PI) * sleepDialRadius,
  }

  return useObserver(() => (
    <View style={parsedSleepDialStyles.WRAPPER}>
      {displayClock && !isUpdating ? (
        <View {...parsedSleepDialStyles.ABSOLUTE}>
          <View {...parsedSleepDialStyles.CLOCK}>
            <Clock
              clockRadius={sleepDialRadius - trackWidth + sleepDialRadius / 20}
              margin={trackWidth + trackWidth / 2 - sleepDialRadius / 20}
            />
          </View>
        </View>
      ) : null}
      <View {...parsedSleepDialStyles.ABSOLUTE}>
        {isUpdating && <SleepTimeDisplay sleepTime={schedule.sleepTime} />}
        <Svg
          testID="sleepDial"
          id="sleep-dial"
          height={height}
          width={width}
          ref={ref => (sleepDialRef = ref)}
        >
          <Circle r={sleepDialRadius} {...parsedSleepDialProps.DIAL_TRACK}></Circle>
          <Path
            d={sleepDialArc}
            transform={`translate(${sleepDialRadius + trackWidth / 2}, ${sleepDialRadius +
              trackWidth})`}
            {...parsedSleepDialProps.DIAL_ARC}
          ></Path>
          <G
            transform={{
              translate: `${panHandleTransformStart.x}, ${panHandleTransformStart.y}`,
            }}
          >
            <Circle
              {...parsedSleepDialProps.DIAL_PAN_HANDLER_START}
              {...sleepPanResponder.panHandlers}
            />
            <G translate={[-(trackWidth / 4), -(trackWidth / 4)]}>
              <Ionicon
                name={"ios-bed"}
                style={{
                  ...parsedSleepDialStyles.DIAL_ICON_BEDTIME,
                  ...commonStyles.POSITION.ABSOLUTE,
                }}
              />
            </G>
          </G>
          <G
            transform={{
              translate: `${panHandleTransformEnd.x}, ${panHandleTransformEnd.y}`,
            }}
          >
            <Circle
              {...parsedSleepDialProps.DIAL_PAN_HANDLER_END}
              {...wakePanResponder.panHandlers}
            />
            <G translate={[-(trackWidth / 4) - 1, -(trackWidth / 4) - 4]}>
              <Ionicon
                name={"ios-sunny"}
                style={{
                  ...parsedSleepDialStyles.DIAL_ICON_WAKETIME,
                  ...commonStyles.POSITION.ABSOLUTE,
                }}
              />
            </G>
          </G>
        </Svg>
      </View>
    </View>
  ))
}
