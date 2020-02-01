import { color } from "../../theme/color"
import { ViewStyle } from "react-native"
import { CircleProps, SvgProps, LineProps, TextProps, PathProps } from "react-native-svg"

export const sleepDialStyles = (sleepDialRadius, trackWidth) => ({
  WRAPPER: {
    justifyContent: "center",
    // backgroundColor: "green",
    position: "relative",
    height: sleepDialRadius * 2 + trackWidth,
    width: sleepDialRadius * 2 + trackWidth,
  } as ViewStyle,
  ABSOLUTE: {
    position: "absolute",
  } as ViewStyle,
})

export const sleepDialProps = (sleepDialRadius, trackWidth) => ({
  CLOCK: {
    backgroundColor: "transparent",
  } as ViewStyle,
  DIAL_ARC: {
    fill: color.primary,
  } as PathProps,
  DIAL_TRACK: {
    // fill: "red",
    r: sleepDialRadius,
    cx: sleepDialRadius + trackWidth / 2,
    cy: sleepDialRadius + trackWidth,
    stroke: color.palette.offBlack,
    strokeWidth: sleepDialRadius / 4,
  } as CircleProps,
})
