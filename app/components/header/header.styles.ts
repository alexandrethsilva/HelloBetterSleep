import { ViewStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

export const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.medium,
  alignItems: "center",
  paddingTop: spacing.large,
  paddingBottom: spacing.large,
  justifyContent: "flex-start",
}

export const ICON: TextStyle = {
  color: color.palette.white,
}

export const TITLE: TextStyle = { textAlign: "center" }

export const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }

export const LEFT: ViewStyle = { width: 32 }

export const RIGHT: ViewStyle = { width: 32 }
