import { Film } from "lucide-react"

type EmptyStateProps = {
	title: string
	description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
	return (
		<div className="grid min-h-72 place-items-center rounded-card border border-dashed border-border bg-surface/40 px-6 text-center">
			<div>
				<Film
					className="mx-auto size-8 text-content-muted"
					aria-hidden="true"
				/>
				<h2 className="mt-4 text-lg font-semibold text-content">{title}</h2>
				<p className="mt-2 text-sm text-content-muted">{description}</p>
			</div>
		</div>
	)
}
