import { useQueries } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { ErrorState } from "@/components/ui/error-state"

import { movieDetailsQuery } from "../api/movies-queries"
import { type Movie, type MovieSort, sortMovies } from "../model/movie"
import { MovieGrid } from "./movie-grid"
import { MovieGridSkeleton } from "./movie-grid-skeleton"

type MoviesByIdProps = {
	movieIds: number[]
	renderFavoriteControl: (movie: Movie) => ReactNode
	sort: MovieSort
}

export function MoviesById({
	movieIds,
	renderFavoriteControl,
	sort,
}: MoviesByIdProps) {
	const queries = useQueries({
		queries: movieIds.map((movieId) => movieDetailsQuery(movieId)),
	})
	const movies = sortMovies(
		queries.flatMap((query) => (query.data ? [query.data] : [])),
		sort,
	)
	const isPending = queries.some((query) => query.isPending)
	const hasError = queries.some((query) => query.isError)

	if (isPending) {
		return <MovieGridSkeleton />
	}

	if (hasError) {
		return (
			<ErrorState
				description="Não foi possível carregar os detalhes dos filmes salvos."
				onRetry={() => {
					for (const query of queries) {
						if (query.isError) {
							void query.refetch()
						}
					}
				}}
				title="Não foi possível carregar os favoritos"
			/>
		)
	}

	return (
		<MovieGrid movies={movies} renderFavoriteControl={renderFavoriteControl} />
	)
}
