import { color } from "../theme"
import { ViewStyle, TextStyle } from "react-native"

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

export const commonStyles = {
  POSITION: {
    ABSOLUTE: {
      position: "absolute",
    } as ViewStyle,
    RELATIVE: {
      position: "relative",
    } as ViewStyle,
  },
  BUTTON: {
    borderRadius: 30,
  } as ViewStyle,
  FLEX: {
    CONTENT: {
      AROUND: { justifyContent: "space-around" } as ViewStyle,
      BETWEEN: { justifyContent: "space-between" } as ViewStyle,
      CENTER: { justifyContent: "center" } as ViewStyle,
      END: { justifyContent: "flex-end" } as ViewStyle,
      START: { justifyContent: "flex-start" } as ViewStyle,
    },
    FULL: { flex: 1 } as ViewStyle,
    ITEMS_CENTER: { alignItems: "center" } as ViewStyle,
    ROW: { flexDirection: "row" } as ViewStyle,
    ROW_AROUND: { flexDirection: "row", justifyContent: "space-around" } as ViewStyle,
    ROW_BETWEEN: { flexDirection: "row", justifyContent: "space-between" } as ViewStyle,
    ROW_CENTER: { flexDirection: "row", justifyContent: "center" } as ViewStyle,
    ROW_END: { flexDirection: "row", justifyContent: "flex-end" } as ViewStyle,
    ROW_EVENLY: { flexDirection: "row", justifyContent: "space-evenly" } as ViewStyle,
    ROW_START: { flexDirection: "row", justifyContent: "flex-start" } as ViewStyle,
  },
  TEXT: {
    ...TEXT,
  } as TextStyle,
  TEXT_MUTED: {
    color: color.palette.darkGrey,
  } as TextStyle,
  BOLD: { fontWeight: "bold" } as TextStyle,
}
