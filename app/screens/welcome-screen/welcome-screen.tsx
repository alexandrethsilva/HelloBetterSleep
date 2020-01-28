import { FULL } from "../../styles"
import {
  CONTAINER,
  TITLE_WRAPPER,
  TITLE,
  FOOTER,
  FOOTER_CONTENT,
  CONTINUE,
  CONTINUE_TEXT,
  SCREEN_ICON,
  TAGLINE,
} from "./welcome-screen.styles"
import Ionicon from "react-native-vector-icons/Ionicons"

import * as React from "react"
import { View, SafeAreaView } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { Button, Screen, Text, Wallpaper } from "../../components"
import { color } from "../../theme"

export interface WelcomeScreenProps extends NavigationInjectedProps<{}> {}

export const WelcomeScreen: React.FunctionComponent<WelcomeScreenProps> = props => {
  const nextScreen = React.useMemo(() => () => props.navigation.navigate("bedtime"), [
    props.navigation,
  ])

  return (
    <View testID="WelcomeScreen" style={FULL}>
      <Wallpaper />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Ionicon name={"ios-bed"} style={SCREEN_ICON} />
        <Text style={TITLE_WRAPPER}>
          <Text style={TITLE} tx="sleepTracking.welcomeScreen.title" />
        </Text>
        <Text style={TAGLINE} tx="sleepTracking.welcomeScreen.tagline"></Text>
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={CONTINUE}
            textStyle={CONTINUE_TEXT}
            tx="sleepTracking.welcomeScreen.setup"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
