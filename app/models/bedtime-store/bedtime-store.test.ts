import { BedtimeStoreModel, BedtimeStore } from "./bedtime-store"

test("can be created", () => {
  const instance: BedtimeStore = BedtimeStoreModel.create({
    schedule: undefined,
  })

  expect(instance).toBeTruthy()
})
