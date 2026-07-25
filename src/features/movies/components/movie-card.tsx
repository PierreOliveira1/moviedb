import { ImageOff } from "lucide-react"
import { type CSSProperties, type ReactNode, useState } from "react"
import { Link } from "react-router"

import { Skeleton } from "@/components/ui/skeleton"

import type { Movie } from "../model/movie"
import { getMoviePosterUrl } from "../model/movie-image"
import { MovieRating } from "./movie-rating"

type MovieCardProps = {
	movie: Movie
	favoriteControl: ReactNode
	title?: ReactNode
}

export function MovieCard({ movie, favoriteControl, title }: MovieCardProps) {
	const posterUrl = getMoviePosterUrl(movie.posterPath)
	const [imageStatus, setImageStatus] = useState<
		"loading" | "loaded" | "error"
	>(posterUrl ? "loading" : "error")

	return (
		<article
			className="movie-card group relative cursor-pointer overflow-hidden rounded-card border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand"
			style={
				{
					"--movie-card-transition-name": `movie-card-${movie.id}`,
				} as CSSProperties
			}
		>
			<Link
				aria-label={`Ver detalhes de ${movie.title}`}
				className="block rounded-card outline-none"
				prefetch="intent"
				state={{ fromMovieGrid: true, moviePreview: movie }}
				to={`/movie/${movie.id}`}
				viewTransition
			>
				<div
					className="movie-card-poster relative aspect-[2/3] overflow-hidden bg-surface-raised"
					style={
						{
							"--movie-poster-transition-name": `movie-poster-${movie.id}`,
						} as CSSProperties
					}
				>
					{posterUrl && imageStatus !== "error" ? (
						<>
							{imageStatus === "loading" && (
								<Skeleton className="absolute inset-0 size-full rounded-none" />
							)}
							<img
								alt={`Pôster de ${movie.title}`}
								className={`size-full object-cover transition duration-500 group-hover:scale-[1.03] ${
									imageStatus === "loaded" ? "opacity-100" : "opacity-0"
								}`}
								decoding="async"
								loading="lazy"
								onError={() => setImageStatus("error")}
								onLoad={() => setImageStatus("loaded")}
								src={posterUrl}
							/>
						</>
					) : (
						<div className="grid size-full place-items-center px-4 text-center text-content-muted">
							<div>
								<ImageOff className="mx-auto size-8" aria-hidden="true" />
								<p className="mt-3 text-xs">Pôster indisponível</p>
							</div>
						</div>
					)}

					<div className="absolute bottom-3 left-3">
						<MovieRating rating={movie.voteAverage} />
					</div>
				</div>

				<div className="min-h-24 border-t border-border px-4 py-3">
					<h2
						className="movie-card-title line-clamp-2 text-sm leading-5 font-semibold text-content sm:text-base"
						style={
							{
								"--movie-title-transition-name": `movie-title-${movie.id}`,
							} as CSSProperties
						}
					>
						{title ?? movie.title}
					</h2>
					<p className="mt-1 text-sm text-content-muted">
						{movie.releaseYear ?? "Ano desconhecido"}
					</p>
				</div>
			</Link>

			<div className="absolute top-3 right-3 z-20">{favoriteControl}</div>
		</article>
	)
}
