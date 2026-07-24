import { httpClient } from "@/shared/api/http-client"
import { getTmdbAccessToken, getTmdbApiBaseUrl } from "@/shared/config/env"

import type { PaginatedMovies } from "../model/movie"
import type { MoviePageDto } from "./movies-dto"
import { mapMoviePageDto } from "./movies-mapper"

export async function getPopularMovies(
	page: number,
	signal?: AbortSignal,
): Promise<PaginatedMovies> {
	const searchParams = new URLSearchParams({
		language: "pt-BR",
		page: String(page),
	})
	const response = await httpClient<MoviePageDto>(
		`${getTmdbApiBaseUrl()}/movie/popular?${searchParams}`,
		{
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${getTmdbAccessToken()}`,
			},
			signal,
		},
	)

	return mapMoviePageDto(response)
}

export async function searchMovies(
	query: string,
	page: number,
	signal?: AbortSignal,
): Promise<PaginatedMovies> {
	const searchParams = new URLSearchParams({
		include_adult: "false",
		language: "pt-BR",
		page: String(page),
		query,
	})
	const response = await httpClient<MoviePageDto>(
		`${getTmdbApiBaseUrl()}/search/movie?${searchParams}`,
		{
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${getTmdbAccessToken()}`,
			},
			signal,
		},
	)

	return mapMoviePageDto(response)
}
