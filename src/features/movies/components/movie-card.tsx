import { ImageOff } from "lucide-react"
import { type ReactNode, useState } from "react"

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
		<article className="group cursor-pointer overflow-hidden rounded-card border border-border bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/30">
			<div className="relative aspect-[2/3] overflow-hidden bg-surface-raised">
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

				<div className="absolute top-3 right-3">{favoriteControl}</div>
				<div className="absolute bottom-3 left-3">
					<MovieRating rating={movie.voteAverage} />
				</div>
			</div>

			<div className="min-h-24 border-t border-border px-4 py-3">
				<h2 className="line-clamp-2 text-sm leading-5 font-semibold text-content sm:text-base">
					{title ?? movie.title}
				</h2>
				<p className="mt-1 text-sm text-content-muted">
					{movie.releaseYear ?? "Ano desconhecido"}
				</p>
			</div>
		</article>
	)
}
