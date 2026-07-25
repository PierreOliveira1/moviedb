import { beforeEach, describe, expect, it } from "@jest/globals"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { HttpResponse, http } from "msw"

import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { renderWithProviders } from "@/shared/testing/render-with-providers"
import { server } from "@/shared/testing/server"
import { movieDetailsResponse } from "@/shared/testing/test-data"

import FavoritesRoute from "./route"

function renderFavorites() {
	return renderWithProviders(
		<FavoritesProvider>
			<FavoritesRoute />
		</FavoritesProvider>,
	)
}

describe("FavoritesRoute", () => {
	beforeEach(() => {
		window.localStorage.clear()
	})

	it("shows an empty state with a link to explore movies", () => {
		renderFavorites()

		expect(
			screen.getByRole("heading", { name: "Nenhum favorito ainda" }),
		).toBeInTheDocument()
		expect(
			screen.getByRole("link", { name: "Explorar filmes" }),
		).toHaveAttribute("href", "/")
	})

	it("loads, sorts and removes saved movies", async () => {
		server.use(
			http.get("https://api.themoviedb.org/3/movie/:id", ({ params }) => {
				if (params.id === "603") {
					return HttpResponse.json({
						...movieDetailsResponse,
						id: 603,
						title: "Matrix",
						vote_average: 8.2,
					})
				}

				return HttpResponse.json({
					...movieDetailsResponse,
					id: 550,
					title: "Clube da Luta",
					vote_average: 8.8,
				})
			}),
		)
		window.localStorage.setItem(
			"moviedb:favorite-ids",
			JSON.stringify([603, 550]),
		)
		renderFavorites()

		expect(screen.getByText("2 filmes salvos")).toBeInTheDocument()
		await screen.findByRole("heading", { name: "Matrix" })
		expect(
			screen
				.getAllByRole("heading", { level: 2 })
				.map((title) => title.textContent),
		).toEqual(["Clube da Luta", "Matrix"])

		fireEvent.change(screen.getByRole("combobox", { name: "Ordenar" }), {
			target: { value: "rating-ascending" },
		})
		expect(
			screen
				.getAllByRole("heading", { level: 2 })
				.map((title) => title.textContent),
		).toEqual(["Matrix", "Clube da Luta"])

		fireEvent.click(
			screen.getByRole("button", { name: "Remover Matrix dos favoritos" }),
		)
		await waitFor(() => {
			expect(screen.getByText("1 filme salvo")).toBeInTheDocument()
		})
		expect(window.localStorage.getItem("moviedb:favorite-ids")).toBe("[550]")
	})
})
