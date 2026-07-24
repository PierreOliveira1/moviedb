import { HttpResponse, http, type RequestHandler } from "msw"

import {
	movieDetailsResponse,
	popularMoviesResponse,
	searchMoviesResponse,
} from "./test-data"

export const handlers: RequestHandler[] = [
	http.get("https://api.themoviedb.org/3/movie/popular", ({ request }) => {
		const page = Number(new URL(request.url).searchParams.get("page") ?? 1)

		return HttpResponse.json({
			...popularMoviesResponse,
			page,
		})
	}),
	http.get("https://api.themoviedb.org/3/search/movie", ({ request }) => {
		const url = new URL(request.url)
		const query = url.searchParams.get("query")?.toLocaleLowerCase("pt-BR")

		if (query !== "dune") {
			return HttpResponse.json({
				page: 1,
				results: [],
				total_pages: 0,
				total_results: 0,
			})
		}

		return HttpResponse.json(searchMoviesResponse)
	}),
	http.get("https://api.themoviedb.org/3/movie/:id", () =>
		HttpResponse.json(movieDetailsResponse),
	),
]
