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

export function renderWithProviders(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
): RenderWithProvidersResult {
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
				<MemoryRouter>{ui}</MemoryRouter>
			</QueryClientProvider>,
			options,
		),
		queryClient,
		user: userEvent.setup(),
	}
}
