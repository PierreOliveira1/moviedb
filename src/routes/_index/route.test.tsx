import { beforeEach, describe, expect, it } from "@jest/globals"
import { screen } from "@testing-library/react"
import { useLocation } from "react-router"

import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { renderWithProviders } from "@/shared/testing/render-with-providers"

import HomeRoute from "./route"

function LocationProbe() {
	return <output data-testid="location">{useLocation().pathname}</output>
}

describe("HomeRoute", () => {
	beforeEach(() => window.localStorage.clear())

	it("renders popular movies and toggles a favorite", async () => {
		const { user } = renderWithProviders(
			<FavoritesProvider>
				<HomeRoute />
				<LocationProbe />
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
		expect(screen.getByTestId("location")).toHaveTextContent("/")
	})
})
