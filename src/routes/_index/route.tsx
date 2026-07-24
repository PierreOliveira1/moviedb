import { Film } from "lucide-react"

import { AppShell } from "@/components/common/app-shell"

export function meta() {
	return [
		{ title: "MovieDB" },
		{
			name: "description",
			content: "Descubra filmes e mantenha seus favoritos por perto.",
		},
	]
}

export default function HomeRoute() {
	return (
		<AppShell>
			<section className="flex min-h-[70vh] flex-col justify-center">
				<Film className="size-10 text-amber-400" aria-hidden="true" />
				<p className="mt-8 text-sm font-semibold tracking-[0.3em] text-amber-400 uppercase">
					MovieDB
				</p>
				<h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight sm:text-7xl">
					Seu proximo filme comeca aqui.
				</h1>
				<p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
					A estrutura inicial esta pronta para receber catalogo, busca e
					favoritos.
				</p>
			</section>
		</AppShell>
	)
}
