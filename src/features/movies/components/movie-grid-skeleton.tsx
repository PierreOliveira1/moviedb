import { Skeleton } from "@/components/ui/skeleton"

const skeletonIds = [
	"movie-skeleton-1",
	"movie-skeleton-2",
	"movie-skeleton-3",
	"movie-skeleton-4",
	"movie-skeleton-5",
	"movie-skeleton-6",
	"movie-skeleton-7",
	"movie-skeleton-8",
	"movie-skeleton-9",
	"movie-skeleton-10",
	"movie-skeleton-11",
	"movie-skeleton-12",
] as const

export function MovieGridSkeleton() {
	return (
		<div
			aria-label="Carregando filmes"
			className="grid grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] gap-4 sm:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] sm:gap-5"
			role="status"
		>
			{skeletonIds.map((id) => (
				<div
					className="overflow-hidden rounded-card border border-border bg-surface"
					key={id}
				>
					<Skeleton className="aspect-[2/3] rounded-none" />
					<div className="space-y-2 p-4">
						<Skeleton className="h-4 w-4/5" />
						<Skeleton className="h-3 w-1/3" />
					</div>
				</div>
			))}
		</div>
	)
}
