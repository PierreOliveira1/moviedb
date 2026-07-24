import { infiniteQueryOptions } from "@tanstack/react-query"

import { getPopularMovies, searchMovies } from "./movies-api"

export const moviesQueryKeys = {
	all: ["movies"] as const,
	popular: ["movies", "popular"] as const,
	search: (query: string) => ["movies", "search", query] as const,
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
