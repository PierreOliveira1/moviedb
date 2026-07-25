export type FavoriteSort =
	| "title-ascending"
	| "title-descending"
	| "rating-descending"
	| "rating-ascending"

type FavoritesHeaderProps = {
	count: number
	onSortChange: (sort: FavoriteSort) => void
	sort: FavoriteSort
}

export function FavoritesHeader({
	count,
	onSortChange,
	sort,
}: FavoritesHeaderProps) {
	return (
		<header className="mb-8 border-b border-border pb-7">
			<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1
						className="text-3xl font-bold tracking-tight text-content sm:text-4xl"
						id="favorites-title"
					>
						Meus favoritos
					</h1>
					<p className="mt-2 text-sm text-content-muted">
						{count} {count === 1 ? "filme salvo" : "filmes salvos"}
					</p>
				</div>

				<label className="flex items-center gap-3 text-sm text-content-muted">
					Ordenar
					<select
						className="h-11 cursor-pointer rounded-lg border border-border bg-surface px-4 text-sm text-content outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/15"
						onChange={(event) =>
							onSortChange(event.target.value as FavoriteSort)
						}
						value={sort}
					>
						<option value="title-ascending">Título A→Z</option>
						<option value="title-descending">Título Z→A</option>
						<option value="rating-descending">Maior nota</option>
						<option value="rating-ascending">Menor nota</option>
					</select>
				</label>
			</div>
		</header>
	)
}
