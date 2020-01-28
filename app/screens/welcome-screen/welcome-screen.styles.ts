import { TEXT, BOLD, FULL } from "../../styles"

import { color, spacing, typography } from "../../theme"
import { ViewStyle, TextStyle } from "react-native"

export const CONTAINER: ViewStyle = {
  ...FULL,
  backgroundColor: color.palette.black,
  paddingHorizontal: spacing.medium,
  justifyContent: "center",
  paddingLeft: 40,
  paddingRight: 40,
}

export const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
export const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
export const SCREEN_ICON: TextStyle = {
  color: color.palette.offWhite,
  fontSize: 120,
  lineHeight: 180,
  textAlign: "center",
}
export const TAGLINE: TextStyle = {
  ...TEXT,
  ...typography.size.headline,
  color: color.palette.offWhite,
  fontSize: 18,
  textAlign: "center",
  marginBottom: spacing.large,
  marginTop: spacing.large,
}
export const CONTINUE: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
  backgroundColor: color.primaryDarker,
}
export const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  ...typography.size.headline,
  letterSpacing: 2,
}
export const FOOTER: ViewStyle = { backgroundColor: color.palette.black }
export const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing.extraLarge,
  paddingHorizontal: spacing.extraLarge,
}
