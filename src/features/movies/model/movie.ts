export type Movie = {
	id: number
	title: string
	posterPath: string | null
	voteAverage: number
	releaseYear: number | null
}

export type PaginatedMovies = {
	movies: Movie[]
	page: number
	totalPages: number
	totalResults: number
}
