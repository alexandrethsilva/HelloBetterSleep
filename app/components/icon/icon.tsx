import * as React from "react"
import { View } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import Ionicon from "react-native-vector-icons/Ionicons"

export function Icon(props: IconProps) {
  const { style: styleOverride, size, icon, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Ionicon style={styleOverride} size={size || 20} name={icons[icon]} />
    </View>
  )
}
