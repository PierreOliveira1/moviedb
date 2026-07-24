import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

import { getMovieDetails, getPopularMovies, searchMovies } from "./movies-api"

export const moviesQueryKeys = {
	all: ["movies"] as const,
	details: (movieId: number) => ["movies", "details", movieId] as const,
	popular: ["movies", "popular"] as const,
	search: (query: string) => ["movies", "search", query] as const,
}

export function movieDetailsQuery(movieId: number) {
	return queryOptions({
		queryKey: moviesQueryKeys.details(movieId),
		queryFn: ({ signal }) => getMovieDetails(movieId, signal),
	})
}

export function searchMoviesInfiniteQuery(query: string) {
	return infiniteQueryOptions({
		queryKey: moviesQueryKeys.search(query),
		queryFn: ({ pageParam, signal }) => searchMovies(query, pageParam, signal),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
		enabled: query.length > 0,
	})
}

export function popularMoviesInfiniteQuery() {
	return infiniteQueryOptions({
		queryKey: moviesQueryKeys.popular,
		queryFn: ({ pageParam, signal }) => getPopularMovies(pageParam, signal),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
	})
}
