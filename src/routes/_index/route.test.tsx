import { beforeEach, describe, expect, it } from "@jest/globals"
import { screen } from "@testing-library/react"

import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { renderWithProviders } from "@/shared/testing/render-with-providers"

import HomeRoute from "./route"

describe("HomeRoute", () => {
	beforeEach(() => window.localStorage.clear())

	it("renders popular movies and toggles a favorite", async () => {
		const { user } = renderWithProviders(
			<FavoritesProvider>
				<HomeRoute />
			</FavoritesProvider>,
		)

		expect(
			screen.getByRole("heading", { level: 1, name: "Em alta" }),
		).toBeInTheDocument()
		expect(
			await screen.findByRole("heading", { name: "Duna: Parte Dois" }),
		).toBeInTheDocument()

		const favoriteButton = screen.getByRole("button", {
			name: "Adicionar Duna: Parte Dois aos favoritos",
		})
		await user.click(favoriteButton)

		expect(favoriteButton).toHaveAttribute("aria-pressed", "true")
	})
})
