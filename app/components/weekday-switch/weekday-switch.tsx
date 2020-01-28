import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "../"
import { weekdaySwitchStyles as styles } from "./weekday-switch.styles"

export interface WeekdaySwitchProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * Whether the switch can be toggled
   */
  isInteractive: boolean

  /**
   * Whether the switch is active or not
   */
  isOn: boolean

  /**
   * Whether the switch is active or not
   */
  onChange: () => void

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
export function WeekdaySwitch(props: WeekdaySwitchProps) {
  // grab the props
  const { tx, isInteractive, isOn, onChange, style } = props
  console.tron.log("tx", tx)
  return (
    <View
      style={
        isInteractive && isOn
          ? { ...styles.WEEKDAY_ON, ...style }
          : { ...styles.WEEKDAY_OFF, ...style }
      }
      onTouchEnd={() => (isInteractive ? onChange() : {})}
    >
      <Text tx={tx} style={styles.WEEKDAY_LABEL} />
    </View>
  )
}
