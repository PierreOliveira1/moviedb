import { httpClient } from "@/shared/api/http-client"
import { getTmdbAccessToken, getTmdbApiBaseUrl } from "@/shared/config/env"

import type { MovieDetails, PaginatedMovies } from "../model/movie"
import type { MovieDetailsDto, MoviePageDto } from "./movies-dto"
import { mapMovieDetailsDto, mapMoviePageDto } from "./movies-mapper"

async function tmdbRequest<T>(
	path: string,
	searchParams: URLSearchParams,
	signal?: AbortSignal,
): Promise<T> {
	return httpClient<T>(`${getTmdbApiBaseUrl()}${path}?${searchParams}`, {
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${getTmdbAccessToken()}`,
		},
		signal,
	})
}

export async function getPopularMovies(
	page: number,
	signal?: AbortSignal,
): Promise<PaginatedMovies> {
	const searchParams = new URLSearchParams({
		language: "pt-BR",
		page: String(page),
	})
	const response = await tmdbRequest<MoviePageDto>(
		"/movie/popular",
		searchParams,
		signal,
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
	const response = await tmdbRequest<MoviePageDto>(
		"/search/movie",
		searchParams,
		signal,
	)

	return mapMoviePageDto(response)
}

export async function getMovieDetails(
	movieId: number,
	signal?: AbortSignal,
): Promise<MovieDetails> {
	const searchParams = new URLSearchParams({ language: "pt-BR" })
	const response = await tmdbRequest<MovieDetailsDto>(
		`/movie/${movieId}`,
		searchParams,
		signal,
	)

	return mapMovieDetailsDto(response)
}
