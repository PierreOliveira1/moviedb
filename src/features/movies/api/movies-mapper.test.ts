import { describe, expect, it } from "@jest/globals"

import {
	mapMovieDetailsDto,
	mapMovieDto,
	mapMoviePageDto,
} from "./movies-mapper"

const movieDto = {
	id: 693134,
	poster_path: "/poster.jpg",
	release_date: "2024-02-27",
	title: "Dune: Part Two",
	vote_average: 8.3,
}

describe("movies mapper", () => {
	it("keeps external field names inside the API layer", () => {
		expect(mapMovieDto(movieDto)).toEqual({
			id: 693134,
			posterPath: "/poster.jpg",
			releaseYear: 2024,
			title: "Dune: Part Two",
			voteAverage: 8.3,
		})
	})

	it("caps the TMDB page count at 500", () => {
		expect(
			mapMoviePageDto({
				page: 1,
				results: [movieDto],
				total_pages: 700,
				total_results: 14_000,
			}).totalPages,
		).toBe(500)
	})

	it("maps movie details without leaking the DTO", () => {
		expect(
			mapMovieDetailsDto({
				...movieDto,
				backdrop_path: "/backdrop.jpg",
				genres: [{ id: 878, name: "Ficção científica" }],
				overview: "Overview",
				runtime: 167,
				tagline: "Tagline",
			}),
		).toMatchObject({
			backdropPath: "/backdrop.jpg",
			genres: [{ id: 878, name: "Ficção científica" }],
			overview: "Overview",
			releaseDate: "2024-02-27",
			runtime: 167,
			tagline: "Tagline",
		})
	})
})
