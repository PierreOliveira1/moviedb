import { FavoriteButton } from "@/features/favorites/components/favorite-button"
import { PopularMovies } from "@/features/movies/components/popular-movies"

export function meta() {
	return [
		{ title: "MovieDB" },
		{
			name: "description",
			content: "Descubra filmes e mantenha seus favoritos por perto.",
		},
	]
}

export default function HomeRoute() {
	return (
		<PopularMovies
			renderFavoriteControl={(movie) => (
				<FavoriteButton movieId={movie.id} movieTitle={movie.title} />
			)}
		/>
	)
}
