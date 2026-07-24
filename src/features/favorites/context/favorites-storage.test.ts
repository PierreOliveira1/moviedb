import { beforeEach, describe, expect, it } from "@jest/globals"

import { loadFavoriteIds, saveFavoriteIds } from "./favorites-storage"

describe("favorites storage", () => {
	beforeEach(() => window.localStorage.clear())

	it("persists valid movie IDs", () => {
		saveFavoriteIds(new Set([693134, 872585]))

		expect(loadFavoriteIds()).toEqual([693134, 872585])
	})

	it("ignores invalid persisted data", () => {
		window.localStorage.setItem(
			"moviedb:favorite-ids",
			JSON.stringify([693134, "invalid", -1]),
		)

		expect(loadFavoriteIds()).toEqual([693134])
	})

	it("removes corrupted JSON from storage", () => {
		window.localStorage.setItem("moviedb:favorite-ids", "{")

		expect(loadFavoriteIds()).toEqual([])
		expect(window.localStorage.getItem("moviedb:favorite-ids")).toBeNull()
	})
})
