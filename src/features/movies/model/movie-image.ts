const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

type MovieImageSize = "w300" | "w500" | "original"

export function getMovieImageUrl(
	imagePath: string | null,
	size: MovieImageSize,
): string | null {
	if (!imagePath) {
		return null
	}

	const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`

	return `${TMDB_IMAGE_BASE_URL}/${size}${normalizedPath}`
}

export function getMoviePosterUrl(posterPath: string | null): string | null {
	return getMovieImageUrl(posterPath, "w300")
}

export function getMovieBackdropUrl(
	backdropPath: string | null,
): string | null {
	return getMovieImageUrl(backdropPath, "original")
}
