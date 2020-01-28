import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ClockSlider } from "./clock-slider"

declare let module

storiesOf("ClockSlider", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ClockSlider text="ClockSlider" />
      </UseCase>
    </Story>
  ))
