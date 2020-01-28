import { FULL, TEXT } from "../../styles"
import {
  CONTAINER,
  SPACING_LARGE,
  SPACING_MEDIUM,
  CLOCK,
  ROW,
  CENTER_ITEMS,
  ROW_AROUND,
  ROW_BETWEEN,
  CONTENT,
  JUSTIFY_START,
  SCREEN_ICON,
  SECTION_LABEL,
  SECTION,
  WEEKDAY_LABEL,
  WEEKDAY_ON,
  WEEKDAY_OFF,
  SCHEDULE_BEDTIME_LABEL,
  SCHEDULE_WAKETIME_LABEL,
  SCHEDULE_HOUR,
} from "./bedtime-screen.styles"

import { ICON_BEDTIME, ICON_WAKETIME } from "./bedtime-screen.icons"

import * as React from "react"
import { observer } from "mobx-react-lite"
import { Switch, View } from "react-native"
import { Screen, Text, Header, Wallpaper, ClockSlider } from "../../components"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"
import { NavigationInjectedProps } from "react-navigation"
import { G } from "react-native-svg"
import Ionicon from "react-native-vector-icons/Ionicons"

export interface BedtimeScreenProps extends NavigationInjectedProps<{}> {}

export const BedtimeScreen: React.FunctionComponent<BedtimeScreenProps> = observer(props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const { bedtimeStore } = useStores()
  const { schedule } = bedtimeStore

  const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"]

  console.tron.log(schedule)
  return (
    <View testID="BedtimeScreen" style={FULL}>
      <Wallpaper />
      <Screen
        style={{ ...CONTAINER, ...JUSTIFY_START }}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <Header
          headerTx="sleepTracking.bedtimeScreen.header"
          leftIcon="back"
          onLeftPress={goBack}
        />
        <View style={{ ...CONTENT, ...JUSTIFY_START }}>
          <View style={ROW}>
            <Ionicon name={"ios-bed"} style={SCREEN_ICON} />
            <Text preset="header" tx="sleepTracking.bedtimeScreen.title" style={TEXT} />
          </View>
          <View style={{ ...ROW_BETWEEN, ...SECTION }}>
            <Text tx="sleepTracking.bedtimeScreen.scheduleActivitySwitch"></Text>
            <Switch value={schedule.isActive} onValueChange={schedule.toggleActive} />
          </View>
          <View style={SPACING_MEDIUM}>
            <Text tx="sleepTracking.bedtimeScreen.daysOfTheWeek" style={SECTION_LABEL}></Text>
            <View style={ROW_BETWEEN}>
              {schedule.weekdays.map((day, index) => (
                <View
                  key={index}
                  style={schedule.isActive ? (day ? WEEKDAY_ON : WEEKDAY_OFF) : WEEKDAY_OFF}
                  onTouchEnd={() => schedule.isActive && schedule.toggleWeekday(index)}
                >
                  <Text style={WEEKDAY_LABEL}>{weekdayLabels[index]}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ ...ROW_AROUND, ...SPACING_LARGE }}>
            <View style={CENTER_ITEMS}>
              <Text tx="sleepTracking.bedtimeScreen.bedTime" style={SCHEDULE_BEDTIME_LABEL}></Text>
              <Text style={SCHEDULE_HOUR}>
                {schedule.bedTime.h}:{schedule.bedTime.m}
              </Text>
            </View>
            <View style={CENTER_ITEMS}>
              <Text
                tx="sleepTracking.bedtimeScreen.wakeTime"
                style={SCHEDULE_WAKETIME_LABEL}
              ></Text>
              <Text style={SCHEDULE_HOUR}>
                {schedule.wakeTime.h}:{schedule.wakeTime.m}
              </Text>
            </View>
          </View>
          <View style={CLOCK}>
            <ClockSlider
              angleStart={schedule.start}
              angleLength={schedule.end}
              onUpdate={({ angleStart: start, angleLength: end }) =>
                schedule.isActive && schedule.setScheduledTime({ start, end })
              }
              gradientColorSegments={20}
              trackWidth={45}
              radius={140}
              gradientColorFrom={
                schedule.isActive ? color.palette.orangeDarker : color.palette.darkerGrey
              }
              gradientColorTo={
                schedule.isActive ? color.palette.orangeLighter : color.palette.darkGrey
              }
              showClockFace
              clockFaceColor={"#8D8E96"}
              trackColor={"#1B1C1E"}
              handleStopIcon={
                <G scale="1.1" transform={{ translate: "-8, -8" }}>
                  {ICON_WAKETIME}
                </G>
              }
              handleStartIcon={
                <G scale="1.1" transform={{ translate: "-8, -8" }}>
                  {ICON_BEDTIME}
                </G>
              }
            />
          </View>
        </View>
      </Screen>
    </View>
  )
})
