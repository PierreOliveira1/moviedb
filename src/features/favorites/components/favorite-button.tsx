import { Heart } from "lucide-react"

import { useFavorites } from "../context/favorites-context"

type FavoriteButtonProps = {
	movieId: number
	movieTitle: string
	variant?: "icon" | "button"
}

export function FavoriteButton({
	movieId,
	movieTitle,
	variant = "icon",
}: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavorites()
	const selected = isFavorite(movieId)
	const iconOnly = variant === "icon"
	const label = selected
		? `Remover ${movieTitle} dos favoritos`
		: `Adicionar ${movieTitle} aos favoritos`
	const iconClassName = `grid size-10 cursor-pointer place-items-center rounded-lg border bg-canvas/75 backdrop-blur-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger ${
		selected
			? "border-danger/50 bg-danger/10 text-danger hover:bg-danger/15"
			: "border-border text-content-muted hover:border-danger/60 hover:text-danger"
	}`
	const className = iconOnly
		? iconClassName
		: selected
			? "inline-flex cursor-pointer items-center gap-2 rounded-lg border border-danger/50 bg-danger/10 px-5 py-3 text-sm font-semibold text-danger transition hover:bg-danger/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
			: "inline-flex cursor-pointer items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"

	return (
		<button
			aria-label={label}
			aria-pressed={selected}
			className={className}
			onClick={(event) => {
				event.stopPropagation()
				toggleFavorite(movieId)
			}}
			type="button"
		>
			<Heart
				aria-hidden="true"
				className="size-5"
				fill={selected ? "currentColor" : "none"}
			/>
			{!iconOnly && (
				<span>
					{selected ? "Remover dos favoritos" : "Adicionar aos favoritos"}
				</span>
			)}
		</button>
	)
}
