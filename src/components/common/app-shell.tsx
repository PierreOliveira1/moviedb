import type { PropsWithChildren } from "react"

export function AppShell({ children }: PropsWithChildren) {
	return (
		<main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
			<div className="mx-auto w-full max-w-6xl">{children}</div>
		</main>
	)
}
