import { createStackNavigator } from "react-navigation-stack"
import { WelcomeScreen, BedtimeScreen } from "../screens"

export const RootNavigator = createStackNavigator(
  {
    welcome: { screen: WelcomeScreen },
    bedtime: { screen: BedtimeScreen },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
