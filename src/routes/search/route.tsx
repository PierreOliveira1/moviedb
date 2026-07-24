import { useSearchParams } from "react-router"

import { FavoriteButton } from "@/features/favorites/components/favorite-button"
import { MovieSearch } from "@/features/movies/search/movie-search"

export function meta() {
	return [
		{ title: "Busca | MovieDB" },
		{
			name: "description",
			content: "Pesquise filmes no catálogo do TMDB.",
		},
	]
}

export default function SearchRoute() {
	const [searchParams] = useSearchParams()
	const query = searchParams.get("q")?.trim() ?? ""

	return (
		<MovieSearch
			query={query}
			renderFavoriteControl={(movie) => (
				<FavoriteButton movieId={movie.id} movieTitle={movie.title} />
			)}
		/>
	)
}
