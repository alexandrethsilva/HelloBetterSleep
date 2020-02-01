import { color, spacing } from "../../theme"
import { ViewStyle, TextStyle } from "react-native"
import { CircleProps, PathProps } from "react-native-svg"

export const sleepDialStyles = (isActive, sleepDialRadius, trackWidth) => ({
  WRAPPER: {
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
    height: sleepDialRadius * 2 + trackWidth,
    width: sleepDialRadius * 2 + trackWidth,
  } as ViewStyle,
  ABSOLUTE: {
    position: "absolute",
    right: 0,
    left: 0,
  } as ViewStyle,
  CLOCK: {
    backgroundColor: "transparent",
  } as ViewStyle,
  DIAL_ICON_BEDTIME: {
    color: color.palette.offWhite,
    fontSize: trackWidth / 2,
    lineHeight: trackWidth / 2,
    textAlign: "center",
    marginRight: spacing.medium,
  } as TextStyle,
  DIAL_ICON_WAKETIME: {
    color: color.palette.offWhite,
    fontSize: trackWidth / 1.5,
    textAlign: "center",
    marginRight: spacing.medium,
  } as TextStyle,
})

export const sleepDialProps = (isActive, sleepDialRadius, trackWidth) => ({
  DIAL_ARC: {
    fill: isActive ? color.primary : color.palette.darkerGrey,
  } as PathProps,
  DIAL_TRACK: {
    fill: "transparent",
    r: sleepDialRadius,
    cx: sleepDialRadius + trackWidth / 2,
    cy: sleepDialRadius + trackWidth,
    stroke: color.palette.offBlack,
    strokeWidth: sleepDialRadius / 3,
  } as CircleProps,
  DIAL_PAN_HANDLER_END: {
    fill: color.palette.offBlack,
    r: trackWidth / 2 - 3,
    stroke: isActive ? color.primary : color.palette.darkerGrey,
    strokeWidth: 2,
  } as CircleProps,
  DIAL_PAN_HANDLER_START: {
    fill: color.palette.offBlack,
    r: trackWidth / 2 - 3,
    stroke: isActive ? color.primary : color.palette.darkerGrey,
    strokeWidth: 2,
  } as CircleProps,
})
