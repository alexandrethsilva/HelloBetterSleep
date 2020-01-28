import { FULL, TEXT } from "../../styles"

import { color, spacing, typography } from "../../theme"
import { ViewStyle, TextStyle } from "react-native"

export const CONTAINER: ViewStyle = {
  ...FULL,
  backgroundColor: color.palette.black,
  paddingHorizontal: spacing.medium,
  justifyContent: "flex-start",
}

export const SPACING_LARGE: ViewStyle = {
  marginVertical: spacing.large,
}
export const SPACING_MEDIUM: ViewStyle = {
  marginVertical: spacing.medium,
}
export const CLOCK: ViewStyle = {
  ...FULL,
  justifyContent: "center",
  alignItems: "center",
}
export const ROW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
export const CENTER_ITEMS: ViewStyle = {
  alignItems: "center",
}
export const ROW_AROUND: ViewStyle = {
  ...ROW,
  justifyContent: "space-around",
}
export const ROW_BETWEEN: ViewStyle = {
  ...ROW,
  justifyContent: "space-between",
}
export const CONTENT: ViewStyle = {
  ...FULL,
  backgroundColor: color.palette.black,
  paddingHorizontal: spacing.medium,
  justifyContent: "flex-start",
  padding: spacing.large,
}
export const JUSTIFY_START: ViewStyle = {
  justifyContent: "flex-start",
}
export const SCREEN_ICON: TextStyle = {
  color: color.palette.offWhite,
  fontSize: 30,
  lineHeight: 40,
  textAlign: "center",
  marginRight: spacing.medium,
}
export const SECTION_LABEL: TextStyle = {
  ...TEXT,
  ...typography.size.footnote,
  color: color.palette.lighterGrey,
  textTransform: "uppercase",
  marginBottom: spacing.medium,
  marginTop: spacing.medium,
}
export const SECTION: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: color.line,
  borderTopWidth: 1,
  borderTopColor: color.line,
  paddingVertical: spacing.smaller,
}
export const WEEKDAY: ViewStyle = {
  height: spacing.extraLarge,
  width: spacing.extraLarge,
  borderRadius: spacing.huge,
  alignItems: "center",
  justifyContent: "center",
}
export const WEEKDAY_LABEL: TextStyle = {
  color: color.palette.black,
  fontWeight: "600",
}
export const WEEKDAY_ON: ViewStyle = {
  ...WEEKDAY,
  backgroundColor: color.primary,
}
export const WEEKDAY_OFF: ViewStyle = {
  ...WEEKDAY,
  backgroundColor: color.palette.darkGrey,
}

export const SCHEDULE_LABEL: TextStyle = {
  ...TEXT,
  ...typography.size.title2,
}
export const SCHEDULE_BEDTIME_LABEL: TextStyle = {
  ...SCHEDULE_LABEL,
  color: color.palette.orangeDarker,
}
export const SCHEDULE_WAKETIME_LABEL: TextStyle = {
  ...SCHEDULE_LABEL,
  color: color.palette.orangeLighter,
}
export const SCHEDULE_HOUR: TextStyle = {
  ...TEXT,
  fontSize: 50,
  color: color.palette.white,
}
