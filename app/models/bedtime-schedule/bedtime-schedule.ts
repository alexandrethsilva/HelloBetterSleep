import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { compose, repeat } from "ramda"
import {
  calculateTimeFromAngle,
  roundAngleToFives,
  calculateAngleFromHour,
  padTime,
  TimeText,
} from "../../utils/time-manipulation"

/**
 * Model description here for TypeScript hints.
 */
export const BedtimeScheduleModel = types
  .model("BedtimeSchedule")
  .props({
    isActive: types.optional(types.boolean, false),
    weekdays: types.optional(types.array(types.boolean), repeat(false, 7)),
    start: types.optional(types.number, calculateAngleFromHour(12)),
    end: types.optional(types.number, calculateAngleFromHour(6)),
  })
  .views(self => ({
    get bedTime(): TimeText {
      return compose(
        padTime,
        calculateTimeFromAngle,
      )(self.start)
    },
    get wakeTime(): TimeText {
      return compose(
        padTime,
        calculateTimeFromAngle,
      )((self.start + self.end) % (2 * Math.PI))
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
      self.start = roundAngleToFives(start)
      self.end = roundAngleToFives(end)
    },
  }))

type BedtimeScheduleType = Instance<typeof BedtimeScheduleModel>
export interface BedtimeSchedule extends BedtimeScheduleType {}
type BedtimeScheduleSnapshotType = SnapshotOut<typeof BedtimeScheduleModel>
export interface BedtimeScheduleSnapshot extends BedtimeScheduleSnapshotType {}
