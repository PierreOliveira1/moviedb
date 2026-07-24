import { useInfiniteQuery } from "@tanstack/react-query"
import type { ReactNode } from "react"

import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"

import { searchMoviesInfiniteQuery } from "../api/movies-queries"
import { MovieGrid } from "../components/movie-grid"
import { MovieGridSkeleton } from "../components/movie-grid-skeleton"
import { useInfiniteScroll } from "../components/use-infinite-scroll"
import type { Movie } from "../model/movie"
import { HighlightedTitle } from "./highlighted-title"

type MovieSearchProps = {
	query: string
	renderFavoriteControl: (movie: Movie) => ReactNode
}

export function MovieSearch({
	query,
	renderFavoriteControl,
}: MovieSearchProps) {
	const normalizedQuery = query.trim()
	const searchQuery = useInfiniteQuery(
		searchMoviesInfiniteQuery(normalizedQuery),
	)
	const movies = searchQuery.data?.pages.flatMap((page) => page.movies) ?? []
	const totalResults = searchQuery.data?.pages[0]?.totalResults ?? 0
	const loadMoreRef = useInfiniteScroll({
		canLoadMore: Boolean(searchQuery.hasNextPage),
		isLoading: searchQuery.isFetchingNextPage,
		loadMore: searchQuery.fetchNextPage,
	})

	if (!normalizedQuery) {
		return (
			<EmptyState
				description="Use a barra acima para encontrar um filme."
				title="Digite um termo para pesquisar"
			/>
		)
	}

	return (
		<section aria-labelledby="search-results-title">
			<header className="mb-8">
				<h1
					className="text-2xl font-bold tracking-tight text-content sm:text-3xl"
					id="search-results-title"
				>
					Resultados para{" "}
					<span className="text-brand">“{normalizedQuery}”</span>
				</h1>
				{searchQuery.data && (
					<p className="mt-2 text-sm text-content-muted">
						{totalResults}{" "}
						{totalResults === 1 ? "filme encontrado" : "filmes encontrados"}
					</p>
				)}
			</header>

			{searchQuery.isPending && <MovieGridSkeleton />}

			{searchQuery.isError && (
				<ErrorState
					description={
						searchQuery.error instanceof Error
							? searchQuery.error.message
							: "Não foi possível consultar o TMDB."
					}
					onRetry={() => searchQuery.refetch()}
					title="Não foi possível buscar os filmes"
				/>
			)}

			{searchQuery.data && movies.length === 0 && (
				<EmptyState
					description="Tente pesquisar com outro termo."
					title="Nenhum resultado"
				/>
			)}

			{movies.length > 0 && (
				<>
					<MovieGrid
						movies={movies}
						renderFavoriteControl={renderFavoriteControl}
						renderTitle={(movie) => (
							<HighlightedTitle query={normalizedQuery} title={movie.title} />
						)}
					/>
					<div
						aria-live="polite"
						className="mt-10 flex min-h-14 items-center justify-center border-t border-border pt-6"
						ref={loadMoreRef}
					>
						{searchQuery.hasNextPage ? (
							<button
								className="cursor-pointer rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-content transition hover:border-brand/50 hover:text-brand disabled:cursor-wait disabled:opacity-50"
								disabled={searchQuery.isFetchingNextPage}
								onClick={() => void searchQuery.fetchNextPage()}
								type="button"
							>
								{searchQuery.isFetchingNextPage
									? "Carregando mais filmes..."
									: "Carregar mais"}
							</button>
						) : (
							<p className="text-sm text-content-muted">
								Você chegou ao fim dos resultados.
							</p>
						)}
					</div>
				</>
			)}
		</section>
	)
}
