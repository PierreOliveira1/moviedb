import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react"

import { loadFavoriteIds, saveFavoriteIds } from "./favorites-storage"

type FavoritesContextValue = {
	isFavorite: (movieId: number) => boolean
	toggleFavorite: (movieId: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: PropsWithChildren) {
	const [favoriteIds, setFavoriteIds] = useState(
		() => new Set(loadFavoriteIds()),
	)

	useEffect(() => saveFavoriteIds(favoriteIds), [favoriteIds])

	function toggleFavorite(movieId: number) {
		setFavoriteIds((currentIds) => {
			const nextIds = new Set(currentIds)

			if (nextIds.has(movieId)) {
				nextIds.delete(movieId)
			} else {
				nextIds.add(movieId)
			}

			return nextIds
		})
	}

	return (
		<FavoritesContext
			value={{
				isFavorite: (movieId) => favoriteIds.has(movieId),
				toggleFavorite,
			}}
		>
			{children}
		</FavoritesContext>
	)
}

export function useFavorites(): FavoritesContextValue {
	const context = useContext(FavoritesContext)

	if (!context) {
		throw new Error("useFavorites must be used inside FavoritesProvider")
	}

	return context
}
