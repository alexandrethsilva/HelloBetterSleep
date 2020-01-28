import { TextStyle, ViewStyle } from "react-native"
import { IconTypes } from "./icons"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: TextStyle

  /**
   * Style overrides for the icon size
   */
  size?: number

  /**
   * Style overrides for the icon container
   */

  containerStyle?: ViewStyle

  /**
   * The name of the icon
   */

  icon?: IconTypes
}
