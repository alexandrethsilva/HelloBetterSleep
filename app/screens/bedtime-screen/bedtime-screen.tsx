import { commonStyles } from "../../styles"
import { bedtimeScreenStyles } from "./bedtime-screen.styles"

import { ICON_BEDTIME, ICON_WAKETIME } from "./bedtime-screen.icons"

import * as React from "react"
import { observer } from "mobx-react-lite"
import { Switch, View } from "react-native"
import {
  Screen,
  Text,
  Header,
  Wallpaper,
  WeekdaySwitch,
  ClockSlider,
  Clock,
} from "../../components"
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

  return (
    <View testID="BedtimeScreen" style={commonStyles.FULL}>
      <Wallpaper />
      <Screen
        style={{ ...bedtimeScreenStyles.CONTAINER, ...bedtimeScreenStyles.JUSTIFY_START }}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <Header
          headerTx="sleepTracking.bedtimeScreen.header"
          leftIcon="back"
          onLeftPress={goBack}
        />
        <View style={{ ...bedtimeScreenStyles.CONTENT, ...bedtimeScreenStyles.JUSTIFY_START }}>
          <View style={bedtimeScreenStyles.ROW}>
            <Ionicon name={"ios-bed"} style={bedtimeScreenStyles.SCREEN_ICON} />
            <Text
              preset="header"
              tx="sleepTracking.bedtimeScreen.title"
              style={commonStyles.TEXT}
            />
          </View>
          <View style={{ ...bedtimeScreenStyles.ROW_BETWEEN, ...bedtimeScreenStyles.SECTION }}>
            <Text tx="sleepTracking.bedtimeScreen.scheduleActivitySwitch"></Text>
            <Switch value={schedule.isActive} onValueChange={schedule.toggleActive} />
          </View>
          <View style={bedtimeScreenStyles.SPACING_MEDIUM}>
            <Text
              tx="sleepTracking.bedtimeScreen.daysOfTheWeek"
              style={bedtimeScreenStyles.SECTION_LABEL}
            ></Text>
            <View style={bedtimeScreenStyles.ROW_BETWEEN}>
              {schedule.weekdays.map((day, index) => (
                <WeekdaySwitch
                  key={index}
                  isInteractive={schedule.isActive}
                  isOn={schedule.weekdays[index]}
                  tx={`sleepTracking.bedtimeScreen.weekdays.${index}`}
                  onChange={() => schedule.toggleWeekday(index)}
                />
              ))}
            </View>
          </View>
          <View style={{ ...bedtimeScreenStyles.ROW_AROUND, ...bedtimeScreenStyles.SPACING_LARGE }}>
            <View style={bedtimeScreenStyles.CENTER_ITEMS}>
              <Text
                tx="sleepTracking.bedtimeScreen.bedTime"
                style={
                  schedule.isActive
                    ? bedtimeScreenStyles.SCHEDULE_BEDTIME_LABEL
                    : { ...bedtimeScreenStyles.SCHEDULE_BEDTIME_LABEL, ...commonStyles.TEXT_MUTED }
                }
              ></Text>
              <Text
                style={
                  schedule.isActive
                    ? bedtimeScreenStyles.SCHEDULE_HOUR
                    : { ...bedtimeScreenStyles.SCHEDULE_HOUR, ...commonStyles.TEXT_MUTED }
                }
              >
                {schedule.bedTime.h}:{schedule.bedTime.m}
              </Text>
            </View>
            <View style={bedtimeScreenStyles.CENTER_ITEMS}>
              <Text
                tx="sleepTracking.bedtimeScreen.wakeTime"
                style={
                  schedule.isActive
                    ? bedtimeScreenStyles.SCHEDULE_WAKETIME_LABEL
                    : { ...bedtimeScreenStyles.SCHEDULE_WAKETIME_LABEL, ...commonStyles.TEXT_MUTED }
                }
              ></Text>
              <Text
                style={
                  schedule.isActive
                    ? bedtimeScreenStyles.SCHEDULE_HOUR
                    : { ...bedtimeScreenStyles.SCHEDULE_HOUR, ...commonStyles.TEXT_MUTED }
                }
              >
                {schedule.wakeTime.h}:{schedule.wakeTime.m}
              </Text>
            </View>
          </View>
          <View style={bedtimeScreenStyles.CLOCK}>
            <Clock />
            {/* <ClockSlider
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
            /> */}
          </View>
        </View>
      </Screen>
    </View>
  )
})
