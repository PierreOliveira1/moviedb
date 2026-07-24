const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN?.trim()
const tmdbApiBaseUrl = import.meta.env.VITE_TMDB_API_BASE_URL?.trim().replace(
	/\/+$/,
	"",
)

export function getTmdbApiBaseUrl(): string {
	if (!tmdbApiBaseUrl) {
		throw new Error(
			"VITE_TMDB_API_BASE_URL is not configured. Add it to your local environment.",
		)
	}

	return tmdbApiBaseUrl
}

export function getTmdbAccessToken(): string {
	if (!tmdbAccessToken) {
		throw new Error(
			"VITE_TMDB_ACCESS_TOKEN is not configured. Add it to your local environment.",
		)
	}

	return tmdbAccessToken
}
