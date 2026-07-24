import type { PropsWithChildren } from "react"

import { AppHeader } from "./app-header"

export function AppShell({ children }: PropsWithChildren) {
	return (
		<div className="min-h-screen bg-canvas text-content">
			<AppHeader />
			<main className="mx-auto w-full max-w-[112rem] px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
				{children}
			</main>
		</div>
	)
}
