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
      isActive: true,
      weekdays: repeat(false, 7),
      start: undefined,
      end: undefined,
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
