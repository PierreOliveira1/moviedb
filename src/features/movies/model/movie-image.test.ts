import { describe, expect, it } from "@jest/globals"

import { getMovieBackdropUrl, getMoviePosterUrl } from "./movie-image"

describe("getMoviePosterUrl", () => {
	it("builds a w300 TMDB image URL", () => {
		expect(getMoviePosterUrl("/poster.jpg")).toBe(
			"https://image.tmdb.org/t/p/w300/poster.jpg",
		)
	})

	it("returns null when no poster is available", () => {
		expect(getMoviePosterUrl(null)).toBeNull()
	})

	it("builds an original TMDB backdrop URL", () => {
		expect(getMovieBackdropUrl("/backdrop.jpg")).toBe(
			"https://image.tmdb.org/t/p/original/backdrop.jpg",
		)
	})
})
