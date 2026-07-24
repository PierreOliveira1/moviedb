import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
	type RenderOptions,
	type RenderResult,
	render,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactElement } from "react"
import { MemoryRouter } from "react-router"

type RenderWithProvidersResult = RenderResult & {
	queryClient: QueryClient
	user: ReturnType<typeof userEvent.setup>
}

type RenderWithProvidersOptions = Omit<RenderOptions, "wrapper"> & {
	route?: string
}

export function renderWithProviders(
	ui: ReactElement,
	options: RenderWithProvidersOptions = {},
): RenderWithProvidersResult {
	const { route = "/", ...renderOptions } = options
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return {
		...render(
			<QueryClientProvider client={queryClient}>
				<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
			</QueryClientProvider>,
			renderOptions,
		),
		queryClient,
		user: userEvent.setup(),
	}
}
