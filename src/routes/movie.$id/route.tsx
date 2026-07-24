import { useLocation, useParams } from "react-router"

import { ErrorState } from "@/components/ui/error-state"
import { MovieDetails } from "@/features/movies/details/movie-details"
import type { MoviePreview } from "@/features/movies/model/movie"

export function meta() {
	return [
		{ title: "Detalhes do filme | MovieDB" },
		{
			name: "description",
			content: "Veja informações completas sobre o filme.",
		},
	]
}

export default function MovieDetailsRoute() {
	const location = useLocation()
	const { id } = useParams()
	const movieId = Number(id)

	if (!Number.isSafeInteger(movieId) || movieId <= 0) {
		return (
			<ErrorState
				description="O identificador informado não é válido."
				title="Filme não encontrado"
			/>
		)
	}

	const preview = location.state?.moviePreview as MoviePreview | undefined

	return (
		<MovieDetails
			movieId={movieId}
			preview={preview?.id === movieId ? preview : undefined}
		/>
	)
}
