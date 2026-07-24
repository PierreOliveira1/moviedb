import { useInfiniteQuery } from "@tanstack/react-query"
import { type ReactNode, useEffect, useEffectEvent, useRef } from "react"

import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"

import { popularMoviesInfiniteQuery } from "../api/movies-queries"
import type { Movie } from "../model/movie"
import { MovieGrid } from "./movie-grid"
import { MovieGridSkeleton } from "./movie-grid-skeleton"

type PopularMoviesProps = {
	renderFavoriteControl: (movie: Movie) => ReactNode
}

export function PopularMovies({ renderFavoriteControl }: PopularMoviesProps) {
	const query = useInfiniteQuery(popularMoviesInfiniteQuery())
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const movies = query.data?.pages.flatMap((page) => page.movies) ?? []

	const loadNextPage = useEffectEvent(() => {
		if (!query.hasNextPage || query.isFetchingNextPage) {
			return
		}

		void query.fetchNextPage()
	})

	useEffect(() => {
		const sentinel = loadMoreRef.current
		if (
			!sentinel ||
			!query.hasNextPage ||
			!("IntersectionObserver" in window)
		) {
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					loadNextPage()
				}
			},
			{ rootMargin: "400px 0px" },
		)

		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [query.hasNextPage])

	return (
		<section aria-labelledby="popular-movies-title">
			<header className="mb-8">
				<p className="text-xs font-bold tracking-[0.24em] text-brand uppercase">
					Catálogo
				</p>
				<h1
					className="mt-2 text-3xl font-bold tracking-tight text-content sm:text-4xl"
					id="popular-movies-title"
				>
					Em alta
				</h1>
				<p className="mt-2 text-sm text-content-muted sm:text-base">
					Os filmes mais populares do momento
				</p>
			</header>

			{query.isPending && <MovieGridSkeleton />}

			{query.isError && (
				<ErrorState
					description={
						query.error instanceof Error
							? query.error.message
							: "Não foi possível consultar o TMDB."
					}
					onRetry={() => query.refetch()}
					title="Não foi possível carregar os filmes"
				/>
			)}

			{query.data && movies.length === 0 && (
				<EmptyState
					description="Tente novamente em alguns instantes."
					title="Nenhum filme encontrado"
				/>
			)}

			{movies.length > 0 && (
				<>
					<MovieGrid
						movies={movies}
						renderFavoriteControl={renderFavoriteControl}
					/>
					<div
						aria-live="polite"
						className="mt-10 flex min-h-14 items-center justify-center border-t border-border pt-6"
						ref={loadMoreRef}
					>
						{query.hasNextPage ? (
							<button
								className="rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-content transition hover:border-brand/50 hover:text-brand disabled:cursor-wait disabled:opacity-50"
								disabled={query.isFetchingNextPage}
								onClick={() => void query.fetchNextPage()}
								type="button"
							>
								{query.isFetchingNextPage
									? "Carregando mais filmes..."
									: "Carregar mais"}
							</button>
						) : (
							<p className="text-sm text-content-muted">
								Você chegou ao fim da lista.
							</p>
						)}
					</div>
				</>
			)}
		</section>
	)
}
