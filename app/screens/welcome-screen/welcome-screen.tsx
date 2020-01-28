import { commonStyles } from "../../styles"
import { welcomeScreenStyles } from "./welcome-screen.styles"

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
    <View testID="WelcomeScreen" style={commonStyles.FULL}>
      <Wallpaper />
      <Screen
        style={welcomeScreenStyles.CONTAINER}
        preset="fixed"
        backgroundColor={color.transparent}
      >
        <Ionicon name={"ios-bed"} style={welcomeScreenStyles.SCREEN_ICON} />
        <Text style={welcomeScreenStyles.TITLE_WRAPPER}>
          <Text style={welcomeScreenStyles.TITLE} tx="sleepTracking.welcomeScreen.title" />
        </Text>
        <Text style={welcomeScreenStyles.TAGLINE} tx="sleepTracking.welcomeScreen.tagline"></Text>
      </Screen>
      <SafeAreaView style={welcomeScreenStyles.FOOTER}>
        <View style={welcomeScreenStyles.FOOTER_CONTENT}>
          <Button
            testID="next-screen-button"
            style={welcomeScreenStyles.CONTINUE}
            textStyle={welcomeScreenStyles.CONTINUE_TEXT}
            tx="sleepTracking.welcomeScreen.setup"
            onPress={nextScreen}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
