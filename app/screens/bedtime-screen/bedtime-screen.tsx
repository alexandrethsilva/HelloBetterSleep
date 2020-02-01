import { commonStyles } from "../../styles"
import { bedtimeScreenStyles } from "./bedtime-screen.styles"

import * as React from "react"
import { observer } from "mobx-react-lite"
import { Switch, View } from "react-native"
import { Screen, Text, Header, Wallpaper, WeekdaySwitch, SleepDial } from "../../components"
import { useStores } from "../../models/root-store"
import { NavigationInjectedProps } from "react-navigation"
import Ionicon from "react-native-vector-icons/Ionicons"

export interface BedtimeScreenProps extends NavigationInjectedProps<{}> {}

export const BedtimeScreen: React.FunctionComponent<BedtimeScreenProps> = observer(props => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const { bedtimeStore } = useStores()
  const { schedule } = bedtimeStore

  return (
    <View testID="BedtimeScreen" style={commonStyles.FLEX.FULL}>
      <Wallpaper />
      <Screen
        style={{ ...bedtimeScreenStyles.CONTAINER, ...commonStyles.FLEX.CONTENT.START }}
        preset="fixed"
      >
        <Header
          headerTx="sleepTracking.bedtimeScreen.header"
          leftIcon="back"
          onLeftPress={goBack}
        />
        <View style={{ ...bedtimeScreenStyles.CONTENT, ...commonStyles.FLEX.CONTENT.START }}>
          <View style={{ ...commonStyles.FLEX.ROW, ...commonStyles.FLEX.ITEMS_CENTER }}>
            <Ionicon name={"ios-bed"} style={bedtimeScreenStyles.SCREEN_ICON} />
            <Text
              preset="header"
              tx="sleepTracking.bedtimeScreen.title"
              style={commonStyles.TEXT}
            />
          </View>
          <View
            style={{
              ...commonStyles.FLEX.ROW_BETWEEN,
              ...bedtimeScreenStyles.SECTION,
            }}
          >
            <Text tx="sleepTracking.bedtimeScreen.scheduleActivitySwitch"></Text>
            <Switch value={schedule.isActive} onValueChange={schedule.toggleActive} />
          </View>
          <View>
            <Text
              tx="sleepTracking.bedtimeScreen.daysOfTheWeek"
              style={bedtimeScreenStyles.SECTION_LABEL}
            ></Text>
            <View style={commonStyles.FLEX.ROW_BETWEEN}>
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
          <View style={{ ...commonStyles.FLEX.ROW_AROUND, ...bedtimeScreenStyles.SPACING_LARGE }}>
            <View style={{ ...commonStyles.FLEX.ITEMS_CENTER, ...commonStyles.FLEX.FULL }}>
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
            <View style={{ ...commonStyles.FLEX.ITEMS_CENTER, ...commonStyles.FLEX.FULL }}>
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
            <SleepDial sleepDialRadius={140} />
          </View>
        </View>
      </Screen>
    </View>
  )
})
