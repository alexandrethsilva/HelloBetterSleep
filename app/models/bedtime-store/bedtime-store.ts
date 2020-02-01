import { BedtimeScheduleModel, BedtimeScheduleSnapshot } from "../bedtime-schedule/bedtime-schedule"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { repeat } from "ramda"

/**
 * Model description here for TypeScript hints.
 */
export const BedtimeStoreModel = types
  .model("BedtimeStore")
  .props({
    schedule: types.optional(BedtimeScheduleModel, {
      isActive: false,
      weekdays: repeat(false, 7),
      start: { h: 0, m: 10 },
      end: { h: 6, m: 55 },
    }),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    saveBedtimeSchedule: (bedtimeScheduleSnapshot: BedtimeScheduleSnapshot) => {
      self.schedule = BedtimeScheduleModel.create(bedtimeScheduleSnapshot)
    },
  }))

type BedtimeStoreType = Instance<typeof BedtimeStoreModel>
export interface BedtimeStore extends BedtimeStoreType {}
type BedtimeStoreSnapshotType = SnapshotOut<typeof BedtimeStoreModel>
export interface BedtimeStoreSnapshot extends BedtimeStoreSnapshotType {}
