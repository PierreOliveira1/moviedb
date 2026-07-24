import { Star } from "lucide-react"

type MovieRatingProps = {
	rating: number
}

export function MovieRating({ rating }: MovieRatingProps) {
	return (
		<span className="inline-flex items-center gap-1 rounded-md bg-brand px-2 py-1 text-xs font-bold text-on-brand shadow-sm">
			<Star className="size-3" fill="currentColor" aria-hidden="true" />
			<span aria-hidden="true">{rating.toFixed(1)}</span>
			<span className="sr-only">Nota {rating.toFixed(1)} no TMDB</span>
		</span>
	)
}
