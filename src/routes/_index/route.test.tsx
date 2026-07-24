import { describe, expect, it } from "@jest/globals"
import { screen } from "@testing-library/react"

import { renderWithProviders } from "@/shared/testing/render-with-providers"

import HomeRoute from "./route"

describe("HomeRoute", () => {
	it("renders the initial application screen", () => {
		renderWithProviders(<HomeRoute />)

		expect(
			screen.getByRole("heading", {
				name: "Seu proximo filme comeca aqui.",
			}),
		).toBeInTheDocument()
	})
})
