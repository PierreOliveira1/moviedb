import { Heart } from "lucide-react"

import { useFavorites } from "../context/favorites-context"

type FavoriteButtonProps = {
	movieId: number
	movieTitle: string
}

export function FavoriteButton({ movieId, movieTitle }: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavorites()
	const selected = isFavorite(movieId)
	const label = selected
		? `Remover ${movieTitle} dos favoritos`
		: `Adicionar ${movieTitle} aos favoritos`

	return (
		<button
			aria-label={label}
			aria-pressed={selected}
			className="grid size-10 cursor-pointer place-items-center rounded-lg border border-border bg-canvas/75 text-content-muted backdrop-blur-sm transition hover:border-brand/60 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
			onClick={() => toggleFavorite(movieId)}
			type="button"
		>
			<Heart
				aria-hidden="true"
				className="size-5"
				fill={selected ? "currentColor" : "none"}
			/>
		</button>
	)
}
