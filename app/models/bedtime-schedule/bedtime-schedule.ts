import {
  calculateTimeFromMinutes,
  calculateMinutesFromHour,
  calculateMinutesFromTime,
  Time,
  TimeText,
  padTime,
} from "./../../utils/time-manipulation"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { repeat, add, subtract, compose } from "ramda"

const TimeModel = types.model("Time").props({
  h: types.optional(types.number, 0),
  m: types.optional(types.number, 0),
})

/**
 * Model description here for TypeScript hints.
 */
export const BedtimeScheduleModel = types
  .model("BedtimeSchedule")
  .props({
    isActive: types.optional(types.boolean, false),
    weekdays: types.optional(types.array(types.boolean), repeat(false, 7)),
    start: TimeModel,
    end: TimeModel,
  })
  .views(self => ({
    get bedTime(): TimeText {
      return padTime(self.start)
    },
    get wakeTime(): TimeText {
      return padTime(self.end)
    },
    get startInMinutes(): number {
      return calculateMinutesFromTime(self.start)
    },
    get endInMinutes(): number {
      return calculateMinutesFromTime(self.end)
    },
  }))
  .views(self => ({
    get sleepTime(): TimeText {
      const { startInMinutes, endInMinutes, end } = self

      let totalEstimatedSleep: Time
      if (startInMinutes >= endInMinutes) {
        // Estimated sleep until 12
        const until12: Time = calculateTimeFromMinutes(12 * 60 - startInMinutes)

        const hourSum = until12.h + end.h
        const minuteSum = until12.m + end.m

        // Total estimated sleep
        if (startInMinutes === endInMinutes) {
          totalEstimatedSleep = { h: 12, m: 0 }
        } else {
          totalEstimatedSleep = {
            h: minuteSum > 60 ? hourSum + 1 : hourSum,
            m: minuteSum % 60,
          }
        }
      } else {
        // Simple time difference between start and end
        totalEstimatedSleep = compose(
          calculateTimeFromMinutes,
          subtract,
        )(endInMinutes, startInMinutes)
      }

      return padTime(totalEstimatedSleep)
    },
  }))
  .actions(self => ({
    toggleActive: isActive => {
      self.isActive = isActive
    },
    toggleWeekday: index => {
      self.weekdays[index] = !self.weekdays[index]
    },
    setScheduledTime: ({ start, end }) => {
      self.start = start
      self.end = end
    },
  }))

type BedtimeScheduleType = Instance<typeof BedtimeScheduleModel>
export interface BedtimeSchedule extends BedtimeScheduleType {}
type BedtimeScheduleSnapshotType = SnapshotOut<typeof BedtimeScheduleModel>
export interface BedtimeScheduleSnapshot extends BedtimeScheduleSnapshotType {}
