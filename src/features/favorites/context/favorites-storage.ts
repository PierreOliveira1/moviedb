const FAVORITES_STORAGE_KEY = "moviedb:favorite-ids"

function getStorage(): Storage | null {
	return typeof window === "undefined" ? null : window.localStorage
}

export function loadFavoriteIds(): number[] {
	const storage = getStorage()
	if (!storage) {
		return []
	}

	try {
		const value: unknown = JSON.parse(
			storage.getItem(FAVORITES_STORAGE_KEY) ?? "[]",
		)

		if (!Array.isArray(value)) {
			return []
		}

		return value.filter(
			(id): id is number => Number.isSafeInteger(id) && id > 0,
		)
	} catch {
		storage.removeItem(FAVORITES_STORAGE_KEY)
		return []
	}
}

export function saveFavoriteIds(ids: ReadonlySet<number>): void {
	getStorage()?.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...ids]))
}
