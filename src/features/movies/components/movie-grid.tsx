import type { ReactNode } from "react"

import type { Movie } from "../model/movie"
import { MovieCard } from "./movie-card"

type MovieGridProps = {
	movies: Movie[]
	renderFavoriteControl: (movie: Movie) => ReactNode
}

export function MovieGrid({ movies, renderFavoriteControl }: MovieGridProps) {
	return (
		<div className="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] sm:gap-5">
			{movies.map((movie) => (
				<MovieCard
					favoriteControl={renderFavoriteControl(movie)}
					key={movie.id}
					movie={movie}
				/>
			))}
		</div>
	)
}
