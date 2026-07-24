import { describe, expect, it } from "@jest/globals"

import { formatMovieReleaseDate, formatMovieRuntime } from "./movie"

describe("movie details formatting", () => {
	it("formats a release date in Brazilian Portuguese", () => {
		expect(formatMovieReleaseDate("2024-02-27")).toBe("27 de fevereiro de 2024")
	})

	it("formats runtime in hours and minutes", () => {
		expect(formatMovieRuntime(167)).toBe("2h 47min")
	})
})
