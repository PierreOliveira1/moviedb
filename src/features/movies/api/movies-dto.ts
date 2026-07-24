export type MovieDto = {
	id: number
	title: string
	poster_path: string | null
	vote_average: number
	release_date: string
}

export type MoviePageDto = {
	page: number
	results: MovieDto[]
	total_pages: number
	total_results: number
}

export type MovieDetailsDto = MovieDto & {
	backdrop_path: string | null
	genres: Array<{
		id: number
		name: string
	}>
	overview: string
	runtime: number | null
	tagline: string
}
