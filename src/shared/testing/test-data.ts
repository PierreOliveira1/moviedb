export const popularMoviesResponse = {
	page: 1,
	results: [
		{
			id: 693134,
			poster_path: "/dune-part-two.jpg",
			release_date: "2024-02-27",
			title: "Duna: Parte Dois",
			vote_average: 8.3,
		},
		{
			id: 872585,
			poster_path: "/oppenheimer.jpg",
			release_date: "2023-07-19",
			title: "Oppenheimer",
			vote_average: 8.1,
		},
		{
			id: 466420,
			poster_path: null,
			release_date: "2023-05-01",
			title: "Assassinos da Lua das Flores",
			vote_average: 7.5,
		},
	],
	total_pages: 2,
	total_results: 23,
}

export const searchMoviesResponse = {
	page: 1,
	results: [
		{
			id: 693134,
			poster_path: "/dune-part-two.jpg",
			release_date: "2024-02-27",
			title: "Dune: Part Two",
			vote_average: 8.3,
		},
	],
	total_pages: 1,
	total_results: 1,
}

export const movieDetailsResponse = {
	backdrop_path: "/dune-backdrop.jpg",
	genres: [
		{ id: 878, name: "Ficção científica" },
		{ id: 12, name: "Aventura" },
	],
	id: 693134,
	overview:
		"Paul Atreides se une a Chani e aos Fremen em uma jornada de vingança.",
	poster_path: "/dune-part-two.jpg",
	release_date: "2024-02-27",
	runtime: 167,
	tagline: "O sonho é a mensagem.",
	title: "Duna: Parte Dois",
	vote_average: 8.3,
}
