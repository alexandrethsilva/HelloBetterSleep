import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../"
import {
  sleepTimeDisplayStyles as styles,
  sleepTimeDisplayStyles,
} from "./sleep-time-display.styles"
import { TimeText } from "../../utils/time-manipulation"
import { commonStyles } from "../../styles"

export interface SleepTimeDisplayProps {
  /**
   * The total sleep time to be displayed
   */
  sleepTime?: TimeText

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export function SleepTimeDisplay(props: SleepTimeDisplayProps) {
  // grab the props
  const { sleepTime, style } = props

  return (
    <View
      style={{
        ...style,
        ...commonStyles.FLEX.ROW,
        ...commonStyles.FLEX.CONTENT.AROUND,
        ...sleepTimeDisplayStyles.WRAPPER,
      }}
    >
      <View style={{ ...commonStyles.FLEX.ROW }}>
        <Text text={sleepTime.h} style={{ ...styles.SLEEP_TIME }} />
        <Text
          tx={`sleepTracking.bedtimeScreen.timeUnits.hour`}
          style={{ ...styles.SLEEP_TIME_UNIT }}
        />
      </View>
      <View style={{ ...commonStyles.FLEX.ROW }}>
        <Text text={sleepTime.m} style={{ ...styles.SLEEP_TIME }} />
        <Text
          tx={`sleepTracking.bedtimeScreen.timeUnits.minute`}
          style={{ ...styles.SLEEP_TIME_UNIT }}
        />
      </View>
    </View>
  )
}
