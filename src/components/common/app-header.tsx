import { Clapperboard, Search } from "lucide-react"
import { Form, Link, NavLink, useLocation, useSearchParams } from "react-router"

export function AppHeader() {
	const location = useLocation()
	const [searchParams] = useSearchParams()
	const currentQuery =
		location.pathname === "/search" ? (searchParams.get("query") ?? "") : ""
	const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
		`rounded-lg px-4 py-2 text-sm font-medium transition ${
			isActive
				? "bg-surface-raised text-content"
				: "text-content-muted hover:text-content"
		}`

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-canvas/90 backdrop-blur-xl">
			<div className="mx-auto flex w-full max-w-[112rem] flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-10">
				<Link
					className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight text-brand sm:text-xl"
					to="/"
				>
					<Clapperboard className="size-6" aria-hidden="true" />
					MovieDB
				</Link>

				<Form
					action="/search"
					className="order-3 w-full lg:order-none lg:max-w-xl lg:flex-1"
					method="get"
					role="search"
				>
					<label className="relative block">
						<span className="sr-only">Buscar filmes</span>
						<Search
							aria-hidden="true"
							className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-content-muted"
						/>
						<input
							className="h-12 w-full rounded-xl border border-border bg-surface pr-4 pl-12 text-sm text-content outline-none transition placeholder:text-content-muted/70 focus:border-brand/60 focus:ring-2 focus:ring-brand/15"
							defaultValue={currentQuery}
							name="query"
							placeholder="Buscar filmes..."
							type="search"
						/>
					</label>
				</Form>

				<nav
					aria-label="Navegação principal"
					className="ml-auto flex items-center gap-1"
				>
					<NavLink className={navLinkClassName} end to="/">
						Início
					</NavLink>
					<NavLink className={navLinkClassName} to="/favorites">
						Favoritos
					</NavLink>
				</nav>
			</div>
		</header>
	)
}
