import { commonStyles } from "../../styles"

import { color, spacing, typography } from "../../theme"
import { ViewStyle, TextStyle } from "react-native"

export const welcomeScreenStyles = {
  CONTAINER: {
    ...commonStyles.FLEX.FULL,
    backgroundColor: color.palette.black,
    paddingHorizontal: spacing.medium,
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
  } as ViewStyle,

  TITLE_WRAPPER: {
    ...commonStyles.TEXT,
    textAlign: "center",
  } as TextStyle,
  TITLE: {
    ...commonStyles.TEXT,
    ...commonStyles.BOLD,
    fontSize: 28,
    lineHeight: 38,
    textAlign: "center",
  } as TextStyle,
  SCREEN_ICON: {
    color: color.palette.offWhite,
    fontSize: 120,
    lineHeight: 180,
    textAlign: "center",
  } as TextStyle,
  TAGLINE: {
    ...commonStyles.TEXT,
    ...typography.size.headline,
    color: color.palette.offWhite,
    fontSize: 18,
    textAlign: "center",
    marginBottom: spacing.large,
    marginTop: spacing.large,
  } as TextStyle,
  CONTINUE: {
    ...commonStyles.BUTTON,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.medium,
    backgroundColor: color.primaryDarker,
  } as ViewStyle,
  CONTINUE_TEXT: {
    ...commonStyles.TEXT,
    ...commonStyles.BOLD,
    ...typography.size.headline,
    color: color.palette.black,
    letterSpacing: 2,
  } as TextStyle,
  FOOTER: { backgroundColor: color.palette.black } as ViewStyle,
  FOOTER_CONTENT: {
    paddingVertical: spacing.extraLarge,
    paddingHorizontal: spacing.extraLarge,
  } as ViewStyle,
}
