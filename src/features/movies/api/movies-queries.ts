import { infiniteQueryOptions } from "@tanstack/react-query"

import { getPopularMovies } from "./movies-api"

export const moviesQueryKeys = {
	all: ["movies"] as const,
	popular: ["movies", "popular"] as const,
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
