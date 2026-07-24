import { QueryClientProvider } from "@tanstack/react-query"
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useRouteError,
} from "react-router"

import { AppShell } from "@/components/common/app-shell"
import { FavoritesProvider } from "@/features/favorites/context/favorites-context"
import { queryClient } from "@/query-client"

import "./app.css"

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function Root() {
	return (
		<QueryClientProvider client={queryClient}>
			<FavoritesProvider>
				<AppShell>
					<Outlet />
				</AppShell>
			</FavoritesProvider>
		</QueryClientProvider>
	)
}

export function HydrateFallback() {
	return (
		<main className="grid min-h-screen place-items-center bg-canvas text-content">
			<p>Carregando...</p>
		</main>
	)
}

export function ErrorBoundary() {
	const error = useRouteError()
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: "Nao foi possivel carregar a pagina."

	return (
		<main className="grid min-h-screen place-items-center bg-canvas px-6 text-content">
			<section className="max-w-lg text-center">
				<p className="text-sm font-semibold tracking-[0.3em] text-brand uppercase">
					MovieDB
				</p>
				<h1 className="mt-4 text-4xl font-bold">Algo deu errado</h1>
				<p className="mt-3 text-content-muted">{message}</p>
			</section>
		</main>
	)
}
