import { describe, expect, it } from "@jest/globals"
import { fireEvent, render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"

import { AppHeader } from "./app-header"

describe("AppHeader", () => {
	it("returns to the home page when the search input is cleared", () => {
		const router = createMemoryRouter(
			[{ path: "*", element: <AppHeader favoriteCount={0} /> }],
			{ initialEntries: ["/search?q=dune"] },
		)
		render(<RouterProvider router={router} />)

		const searchInput = screen.getByRole("searchbox", {
			name: "Buscar filmes",
		})
		expect(searchInput).toHaveValue("dune")

		fireEvent.change(searchInput, { target: { value: "" } })

		expect(screen.getByRole("link", { name: "Início" })).toHaveAttribute(
			"aria-current",
			"page",
		)
	})
})
