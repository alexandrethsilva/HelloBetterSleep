import { color } from "./../../theme/color"
import { ViewStyle } from "react-native"
import { CircleProps, SvgProps, LineProps, TextProps } from "react-native-svg"

export const clockStyles = {
  WRAPPER: {
    justifyContent: "center",
  } as ViewStyle,
}

export const clockProps = (clockRadius, margin) => ({
  FACE_CANVAS: {
    fill: "transparent",
    r: clockRadius,
    cx: clockRadius + margin,
    cy: clockRadius + margin,
    strokeWidth: clockRadius / 50,
  } as CircleProps,
  CENTER_SCREW: {
    fill: color.palette.white,
    r: clockRadius / 20,
    stroke: color.palette.grey,
    strokeWidth: clockRadius / 50,
  } as CircleProps,
  HAND_SECOND: {
    stroke: color.palette.lighterGrey,
    strokeLinecap: "square",
    strokeWidth: clockRadius / 66,
  } as LineProps,
  HAND_MINUTE: {
    stroke: color.palette.offWhite,
    strokeLinecap: "round",
    strokeWidth: clockRadius / 25,
  } as LineProps,
  HAND_HOUR: {
    stroke: color.palette.white,
    strokeLinecap: "round",
    strokeWidth: clockRadius / 16,
  } as LineProps,
  LABEL_HOUR: {
    fill: color.palette.white,
    fontSize: clockRadius / 6,
    color: color.palette.white,
    stroke: "transparent",
    textAnchor: "middle",
  } as TextProps,
  LABEL_SECOND: {
    fill: color.palette.lighterGrey,
    fontSize: clockRadius / 12.5,
    stroke: "transparent",
    textAnchor: "middle",
  } as TextProps,
  TICK_SECOND: {
    fill: "transparent",
    stroke: color.palette.grey,
    strokeWidth: clockRadius / 60,
  } as LineProps,
  TICK_MINUTE: {
    fill: color.palette.white,
    strokeLinecap: "round",
    strokeWidth: clockRadius / 16,
  } as LineProps,
  TICK_HOUR: {
    stroke: color.palette.white,
    strokeLinecap: "square",
    strokeWidth: clockRadius / 40,
  } as LineProps,
})
