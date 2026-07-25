import { Trash2 } from "lucide-react"

import { useFavorites } from "../context/favorites-context"

type RemoveFavoriteButtonProps = {
	movieId: number
	movieTitle: string
}

export function RemoveFavoriteButton({
	movieId,
	movieTitle,
}: RemoveFavoriteButtonProps) {
	const { toggleFavorite } = useFavorites()

	return (
		<button
			aria-label={`Remover ${movieTitle} dos favoritos`}
			className="grid size-10 cursor-pointer place-items-center rounded-lg border border-border bg-canvas/75 text-content-muted backdrop-blur-sm transition hover:border-danger/60 hover:bg-danger/10 hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
			onClick={(event) => {
				event.stopPropagation()
				toggleFavorite(movieId)
			}}
			type="button"
		>
			<Trash2 className="size-4" aria-hidden="true" />
		</button>
	)
}
