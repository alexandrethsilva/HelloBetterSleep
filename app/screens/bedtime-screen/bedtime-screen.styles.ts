import { commonStyles } from "../../styles"

import { color, spacing, typography } from "../../theme"
import { ViewStyle, TextStyle } from "react-native"

const SCHEDULE_LABEL: TextStyle = {
  ...commonStyles.TEXT,
  ...typography.size.title3,
  fontWeight: "500",
}

export const bedtimeScreenStyles = {
  CONTAINER: {
    ...commonStyles.FLEX.FULL,
    backgroundColor: color.palette.black,
    paddingHorizontal: spacing.medium,
    justifyContent: "flex-start",
  } as ViewStyle,
  SPACING_LARGE: {
    marginVertical: spacing.large,
  } as ViewStyle,
  SPACING_MEDIUM: {
    marginVertical: spacing.medium,
  } as ViewStyle,
  CLOCK: {
    ...commonStyles.FLEX.FULL,
    justifyContent: "flex-start",
    alignItems: "center",
  } as ViewStyle,
  CONTENT: {
    ...commonStyles.FLEX.FULL,
    backgroundColor: color.palette.black,
    paddingHorizontal: spacing.medium,
    justifyContent: "flex-start",
  } as ViewStyle,
  SCREEN_ICON: {
    color: color.palette.offWhite,
    fontSize: 30,
    lineHeight: 40,
    textAlign: "center",
    marginRight: spacing.medium,
  } as TextStyle,
  SECTION: {
    ...commonStyles.FLEX.ITEMS_CENTER,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    borderTopWidth: 1,
    borderTopColor: color.line,
    paddingVertical: spacing.smaller,
  } as ViewStyle,
  SECTION_LABEL: {
    ...commonStyles.TEXT,
    ...typography.size.footnote,
    color: color.palette.lighterGrey,
    textTransform: "uppercase",
    marginBottom: spacing.medium,
    marginTop: spacing.medium,
  } as TextStyle,

  SCHEDULE_BEDTIME_LABEL: {
    ...SCHEDULE_LABEL,
    color: color.palette.orangeDarker,
  } as TextStyle,
  SCHEDULE_WAKETIME_LABEL: {
    ...SCHEDULE_LABEL,
    color: color.palette.orangeLighter,
  } as TextStyle,
  SCHEDULE_HOUR: {
    ...commonStyles.TEXT,
    fontSize: 50,
    color: color.palette.white,
  } as TextStyle,
}
