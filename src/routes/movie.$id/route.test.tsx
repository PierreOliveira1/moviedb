import { beforeEach, describe, expect, it } from "@jest/globals"
import { screen } from "@testing-library/react"
import { Route, Routes } from "react-router"

import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { renderWithProviders } from "@/shared/testing/render-with-providers"

import MovieDetailsRoute from "./route"

describe("MovieDetailsRoute", () => {
	beforeEach(() => window.localStorage.clear())

	it("renders movie details and toggles the favorite", async () => {
		const { user } = renderWithProviders(
			<FavoritesProvider>
				<Routes>
					<Route element={<MovieDetailsRoute />} path="/movie/:id" />
				</Routes>
			</FavoritesProvider>,
			{ route: "/movie/693134" },
		)

		expect(
			await screen.findByRole("heading", {
				level: 1,
				name: "Duna: Parte Dois",
			}),
		).toBeInTheDocument()
		expect(screen.getByText("Ficção científica")).toBeInTheDocument()
		expect(screen.getByText("27 de fevereiro de 2024")).toBeInTheDocument()
		expect(
			document.querySelector('img[src$="/original/dune-backdrop.jpg"]'),
		).not.toBeNull()

		const favoriteButton = screen.getByRole("button", {
			name: "Adicionar Duna: Parte Dois aos favoritos",
		})
		await user.click(favoriteButton)

		expect(favoriteButton).toHaveAttribute("aria-pressed", "true")
		expect(favoriteButton).toHaveTextContent("Remover dos favoritos")
	})
})
