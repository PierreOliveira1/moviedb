import type { Movie, MovieDetails, PaginatedMovies } from "../model/movie"
import type { MovieDetailsDto, MovieDto, MoviePageDto } from "./movies-dto"

function mapReleaseYear(releaseDate: string): number | null {
	const year = Number(releaseDate.slice(0, 4))
	return /^\d{4}/.test(releaseDate) && Number.isInteger(year) ? year : null
}

export function mapMovieDto(dto: MovieDto): Movie {
	return {
		id: dto.id,
		posterPath: dto.poster_path,
		releaseYear: mapReleaseYear(dto.release_date),
		title: dto.title,
		voteAverage: Number.isFinite(dto.vote_average) ? dto.vote_average : 0,
	}
}

export function mapMoviePageDto(dto: MoviePageDto): PaginatedMovies {
	return {
		movies: dto.results.map(mapMovieDto),
		page: dto.page,
		totalPages: Math.min(Math.max(dto.total_pages, 1), 500),
		totalResults: Math.max(dto.total_results, 0),
	}
}

export function mapMovieDetailsDto(dto: MovieDetailsDto): MovieDetails {
	return {
		...mapMovieDto(dto),
		backdropPath: dto.backdrop_path,
		genres: dto.genres.map(({ id, name }) => ({ id, name })),
		overview: dto.overview,
		releaseDate: dto.release_date || null,
		runtime: dto.runtime,
		tagline: dto.tagline || null,
	}
}
