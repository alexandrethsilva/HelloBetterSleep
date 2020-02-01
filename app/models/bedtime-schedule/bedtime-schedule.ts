import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { repeat } from "ramda"
import { padTime, TimeText } from "../../utils/time-manipulation"

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
