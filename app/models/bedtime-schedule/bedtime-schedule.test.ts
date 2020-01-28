import { BedtimeScheduleModel, BedtimeSchedule } from "./bedtime-schedule"
import { repeat } from "ramda"

test("can be created", () => {
  const instance: BedtimeSchedule = BedtimeScheduleModel.create({
    isActive: false,
    weekdays: repeat(false, 7),
    start: undefined,
    end: undefined,
  })

  expect(instance).toBeTruthy()
})
