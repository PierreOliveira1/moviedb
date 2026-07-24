import { Link } from "react-router"

import { AppShell } from "@/components/common/app-shell"

export default function NotFoundRoute() {
	return (
		<AppShell>
			<section className="grid min-h-[70vh] place-items-center text-center">
				<div>
					<p className="text-sm font-semibold tracking-[0.3em] text-amber-400 uppercase">
						Erro 404
					</p>
					<h1 className="mt-4 text-5xl font-bold">Pagina nao encontrada</h1>
					<Link
						className="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
						to="/"
					>
						Voltar ao inicio
					</Link>
				</div>
			</section>
		</AppShell>
	)
}
