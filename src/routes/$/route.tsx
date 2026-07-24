import { Link } from "react-router"

export default function NotFoundRoute() {
	return (
		<section className="grid min-h-[65vh] place-items-center text-center">
			<div>
				<p className="text-sm font-semibold tracking-[0.3em] text-brand uppercase">
					Erro 404
				</p>
				<h1 className="mt-4 text-5xl font-bold">Página não encontrada</h1>
				<Link
					className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-on-brand transition hover:bg-brand-hover"
					to="/"
				>
					Voltar ao início
				</Link>
			</div>
		</section>
	)
}
