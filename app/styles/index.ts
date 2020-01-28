import { color } from "../theme"
import { ViewStyle, TextStyle } from "react-native"

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: "Montserrat",
}

export const commonStyles = {
  FULL: { flex: 1 } as ViewStyle,
  TEXT: {
    ...TEXT,
  } as TextStyle,
  TEXT_MUTED: {
    color: color.palette.darkGrey,
  } as TextStyle,
  BOLD: { fontWeight: "bold" } as TextStyle,
}
