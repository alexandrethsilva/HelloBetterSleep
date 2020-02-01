import { BedtimeScheduleModel, BedtimeSchedule } from "./bedtime-schedule"
import { repeat } from "ramda"

test("can be created", () => {
  const instance: BedtimeSchedule = BedtimeScheduleModel.create({
    isActive: false,
    weekdays: repeat(false, 7),
    start: { h: 0, m: 0 },
    end: { h: 0, m: 0 },
  })

  expect(instance).toBeTruthy()
})
