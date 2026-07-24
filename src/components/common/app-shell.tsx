import type { PropsWithChildren } from "react"

import { AppHeader } from "./app-header"

type AppShellProps = PropsWithChildren<{
	favoriteCount: number
}>

export function AppShell({ children, favoriteCount }: AppShellProps) {
	return (
		<div className="min-h-screen bg-canvas text-content">
			<AppHeader favoriteCount={favoriteCount} />
			<main className="mx-auto w-full max-w-[112rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
				{children}
			</main>
		</div>
	)
}
