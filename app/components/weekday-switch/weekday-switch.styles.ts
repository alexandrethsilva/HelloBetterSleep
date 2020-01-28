import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

const WEEKDAY: ViewStyle = {
  height: spacing.extraLarge,
  width: spacing.extraLarge,
  borderRadius: spacing.huge,
  alignItems: "center",
  justifyContent: "center",
}

export const weekdaySwitchStyles = {
  WRAPPER: {
    justifyContent: "center",
  } as ViewStyle,
  WEEKDAY_LABEL: {
    color: color.palette.black,
    fontWeight: "600",
  } as TextStyle,
  WEEKDAY_ON: {
    ...WEEKDAY,
    backgroundColor: color.primary,
  } as ViewStyle,
  WEEKDAY_OFF: {
    ...WEEKDAY,
    backgroundColor: color.palette.darkGrey,
  },
}
