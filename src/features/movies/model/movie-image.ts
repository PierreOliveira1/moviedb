const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export function getMoviePosterUrl(posterPath: string | null): string | null {
	if (!posterPath) {
		return null
	}

	const normalizedPath = posterPath.startsWith("/")
		? posterPath
		: `/${posterPath}`

	return `${TMDB_IMAGE_BASE_URL}/w300${normalizedPath}`
}
