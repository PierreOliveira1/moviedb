import { HttpResponse, http, type RequestHandler } from "msw"

import { popularMoviesResponse } from "./test-data"

export const handlers: RequestHandler[] = [
	http.get("https://api.themoviedb.org/3/movie/popular", ({ request }) => {
		const page = Number(new URL(request.url).searchParams.get("page") ?? 1)

		return HttpResponse.json({
			...popularMoviesResponse,
			page,
		})
	}),
]
