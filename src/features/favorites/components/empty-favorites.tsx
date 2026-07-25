import { Clapperboard } from "lucide-react"
import { Link } from "react-router"

export function EmptyFavorites() {
	return (
		<section className="grid min-h-[65vh] place-items-center px-6 text-center">
			<div className="max-w-md">
				<div className="mx-auto grid size-16 place-items-center rounded-2xl border border-border bg-surface text-brand">
					<Clapperboard className="size-8" aria-hidden="true" />
				</div>
				<h1 className="mt-6 text-2xl font-bold text-content">
					Nenhum favorito ainda
				</h1>
				<p className="mt-3 leading-7 text-content-muted">
					Explore os filmes e clique no coração para salvar os que você mais
					gosta.
				</p>
				<Link
					className="mt-7 inline-flex rounded-lg bg-brand px-5 py-3 font-semibold text-on-brand transition hover:bg-brand-hover"
					to="/"
					viewTransition
				>
					Explorar filmes
				</Link>
			</div>
		</section>
	)
}
