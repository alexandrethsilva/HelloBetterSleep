import { Platform, TextStyle } from "react-native"

export interface Typography {
  primary: string
  secondary: string
  size: {
    largeTitle: TextStyle
    title1: TextStyle
    title2: TextStyle
    title3: TextStyle
    headline: TextStyle
    body: TextStyle
    callout: TextStyle
    subheadline: TextStyle
    footnote: TextStyle
    caption1: TextStyle
    caption2: TextStyle
  }
}

/**
 * Just the font names.
 *
 * The various styles of fonts are defined in the <Text /> component.
 */
export const typography = {
  /**
   * The primary font.  Used in most places.
   */
  primary: Platform.select({ ios: "Montserrat", android: "Montserrat" }),

  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: "Montserrat", android: "Montserrat" }),

  /**
   * Pre-defined font configurations based on iOS Standard Values
   */
  size: {
    largeTitle: {
      fontSize: 34.0,
    },
    title1: {
      fontSize: 28.0,
      lineHeight: 38,
    },
    title2: {
      fontSize: 22.0,
    },
    title3: {
      fontSize: 20.0,
    },
    headline: {
      fontSize: 17.0,
    },
    body: {
      fontSize: 17.0,
    },
    callout: {
      fontSize: 16.0,
    },
    subheadline: {
      fontSize: 15.0,
    },
    footnote: {
      fontSize: 13.0,
    },
    caption1: {
      fontSize: 12.0,
      lineHeight: 15,
    },
    caption2: {
      fontSize: 11.0,
    },
  },
}
