import { ViewStyle, TextStyle } from "react-native"
import { color, typography } from "../../theme"

export const sleepTimeDisplayStyles = {
  WRAPPER: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  } as ViewStyle,
  SLEEP_TIME: {
    alignSelf: "flex-end",
    color: color.palette.white,
    fontSize: 42,
  } as TextStyle,
  SLEEP_TIME_UNIT: {
    ...typography.size.body,
    alignSelf: "flex-end",
    color: color.palette.white,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 5,
  } as TextStyle,
}
