import { CircleAlert } from "lucide-react"

type ErrorStateProps = {
	title: string
	description: string
	onRetry?: () => void
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
	return (
		<div className="grid min-h-72 place-items-center rounded-card border border-danger/20 bg-danger/5 px-6 text-center">
			<div>
				<CircleAlert
					className="mx-auto size-8 text-danger"
					aria-hidden="true"
				/>
				<h2 className="mt-4 text-lg font-semibold text-content">{title}</h2>
				<p className="mt-2 max-w-lg text-sm text-content-muted">
					{description}
				</p>
				{onRetry && (
					<button
						className="mt-6 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-on-brand transition hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
						onClick={onRetry}
						type="button"
					>
						Tentar novamente
					</button>
				)}
			</div>
		</div>
	)
}
