import { useState } from "react"
import { flushSync } from "react-dom"

import { EmptyFavorites } from "@/features/favorites/components/empty-favorites"
import {
	type FavoriteSort,
	FavoritesHeader,
} from "@/features/favorites/components/favorites-header"
import { RemoveFavoriteButton } from "@/features/favorites/components/remove-favorite-button"
import { useFavorites } from "@/features/favorites/context/favorites-context"
import { MoviesById } from "@/features/movies/components/movies-by-id"

export function meta() {
	return [
		{ title: "Favoritos | MovieDB" },
		{
			name: "description",
			content: "Veja e organize seus filmes favoritos.",
		},
	]
}

export default function FavoritesRoute() {
	const { favoriteCount, favoriteMovieIds } = useFavorites()
	const [sort, setSort] = useState<FavoriteSort>("title-ascending")

	function handleSortChange(nextSort: FavoriteSort) {
		if (nextSort === sort) {
			return
		}

		if (
			"startViewTransition" in document &&
			!window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			document.documentElement.dataset.viewTransition = "favorites-sort"
			const transition = document.startViewTransition(() => {
				flushSync(() => setSort(nextSort))
			})
			const clearTransitionType = () => {
				delete document.documentElement.dataset.viewTransition
			}

			void transition.finished.then(clearTransitionType, clearTransitionType)
			return
		}

		setSort(nextSort)
	}

	if (favoriteCount === 0) {
		return <EmptyFavorites />
	}

	return (
		<section aria-labelledby="favorites-title">
			<FavoritesHeader
				count={favoriteCount}
				onSortChange={handleSortChange}
				sort={sort}
			/>
			<div>
				<MoviesById
					movieIds={favoriteMovieIds}
					renderFavoriteControl={(movie) => (
						<RemoveFavoriteButton movieId={movie.id} movieTitle={movie.title} />
					)}
					sort={sort}
				/>
			</div>
		</section>
	)
}
