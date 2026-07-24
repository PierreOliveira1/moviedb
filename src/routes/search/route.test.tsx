import { beforeEach, describe, expect, it } from "@jest/globals"
import { screen } from "@testing-library/react"

import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { renderWithProviders } from "@/shared/testing/render-with-providers"

import SearchRoute from "./route"

describe("SearchRoute", () => {
	beforeEach(() => window.localStorage.clear())

	it("renders results and highlights the searched term", async () => {
		renderWithProviders(
			<FavoritesProvider>
				<SearchRoute />
			</FavoritesProvider>,
			{ route: "/search?q=dune" },
		)

		expect(
			screen.getByRole("heading", { level: 1, name: /Resultados para.*dune/ }),
		).toBeInTheDocument()
		expect(
			await screen.findByRole("heading", { name: /Dune.*Part Two/ }),
		).toBeInTheDocument()
		expect(screen.getByText("Dune", { selector: "mark" })).toBeInTheDocument()
	})

	it("renders an empty state when no movie matches", async () => {
		renderWithProviders(
			<FavoritesProvider>
				<SearchRoute />
			</FavoritesProvider>,
			{ route: "/search?q=unknown" },
		)

		expect(
			await screen.findByRole("heading", { name: "Nenhum resultado" }),
		).toBeInTheDocument()
	})
})
