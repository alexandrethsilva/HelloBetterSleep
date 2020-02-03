import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { SleepTimeDisplay } from "./sleep-time-display"

declare var module

storiesOf("SleepTimeDisplay", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <SleepTimeDisplay text="SleepTimeDisplay" />
      </UseCase>
    </Story>
  ))
