import { describe, expect, it } from "@jest/globals"

import {
	formatMovieReleaseDate,
	formatMovieRuntime,
	type Movie,
	sortMovies,
} from "./movie"

const movies: Movie[] = [
	{
		id: 1,
		posterPath: null,
		releaseYear: 2024,
		title: "Zodíaco",
		voteAverage: 7.7,
	},
	{
		id: 2,
		posterPath: null,
		releaseYear: 2023,
		title: "Duna",
		voteAverage: 8.3,
	},
]

describe("movie details formatting", () => {
	it("formats a release date in Brazilian Portuguese", () => {
		expect(formatMovieReleaseDate("2024-02-27")).toBe("27 de fevereiro de 2024")
	})

	it("formats runtime in hours and minutes", () => {
		expect(formatMovieRuntime(167)).toBe("2h 47min")
	})

	it("sorts movies without mutating the source list", () => {
		expect(
			sortMovies(movies, "title-ascending").map((movie) => movie.title),
		).toEqual(["Duna", "Zodíaco"])
		expect(sortMovies(movies, "rating-descending")[0]?.title).toBe("Duna")
		expect(movies[0]?.title).toBe("Zodíaco")
	})
})
