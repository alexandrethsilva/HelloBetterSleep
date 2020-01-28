import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { WeekdaySwitch } from "./weekday-switch"

declare var module

storiesOf("WeekdaySwitch", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <WeekdaySwitch text="WeekdaySwitch" />
      </UseCase>
    </Story>
  ))
