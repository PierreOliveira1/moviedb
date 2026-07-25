export type Movie = {
	id: number
	title: string
	posterPath: string | null
	voteAverage: number
	releaseYear: number | null
}

export type MoviePreview = Movie

export type MovieSort =
	| "title-ascending"
	| "title-descending"
	| "rating-descending"
	| "rating-ascending"

export function sortMovies(movies: Movie[], sort: MovieSort): Movie[] {
	const sortedMovies = [...movies]

	sortedMovies.sort((firstMovie, secondMovie) => {
		switch (sort) {
			case "title-descending":
				return secondMovie.title.localeCompare(firstMovie.title, "pt-BR")
			case "rating-descending":
				return secondMovie.voteAverage - firstMovie.voteAverage
			case "rating-ascending":
				return firstMovie.voteAverage - secondMovie.voteAverage
			default:
				return firstMovie.title.localeCompare(secondMovie.title, "pt-BR")
		}
	})

	return sortedMovies
}

export type PaginatedMovies = {
	movies: Movie[]
	page: number
	totalPages: number
	totalResults: number
}

export type MovieGenre = {
	id: number
	name: string
}

export type MovieDetails = Movie & {
	backdropPath: string | null
	genres: MovieGenre[]
	overview: string
	releaseDate: string | null
	runtime: number | null
	tagline: string | null
}

export function formatMovieReleaseDate(releaseDate: string | null): string {
	if (!releaseDate || !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
		return "Data desconhecida"
	}

	return new Intl.DateTimeFormat("pt-BR", {
		dateStyle: "long",
		timeZone: "UTC",
	}).format(new Date(`${releaseDate}T00:00:00Z`))
}

export function formatMovieRuntime(runtime: number | null): string | null {
	if (!runtime || runtime <= 0) {
		return null
	}

	const hours = Math.floor(runtime / 60)
	const minutes = runtime % 60
	return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
}
