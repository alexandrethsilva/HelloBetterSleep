import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { ClockFace } from "./clock-face"

declare var module

storiesOf("ClockFace", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ClockFace text="ClockFace" />
      </UseCase>
    </Story>
  ))
