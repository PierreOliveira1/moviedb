import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, ImageOff } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"

import { ErrorState } from "@/components/ui/error-state"
import { Skeleton } from "@/components/ui/skeleton"
import { FavoriteButton } from "@/features/favorites/components/favorite-button"

import { movieDetailsQuery } from "../api/movies-queries"
import { MovieRating } from "../components/movie-rating"
import type {
	MovieDetails as MovieDetailsModel,
	MoviePreview,
} from "../model/movie"
import { formatMovieReleaseDate, formatMovieRuntime } from "../model/movie"
import { getMovieBackdropUrl, getMovieImageUrl } from "../model/movie-image"

type MovieDetailsProps = {
	movieId: number
	preview?: MoviePreview
}

export function MovieDetails({ movieId, preview }: MovieDetailsProps) {
	const query = useQuery({
		...movieDetailsQuery(movieId),
		placeholderData: preview
			? {
					...preview,
					backdropPath: null,
					genres: [],
					overview: "",
					releaseDate: null,
					runtime: null,
					tagline: null,
				}
			: undefined,
	})

	if (query.isPending) {
		return <MovieDetailsSkeleton movieId={movieId} />
	}

	if (query.isError) {
		return (
			<ErrorState
				description={
					query.error instanceof Error
						? query.error.message
						: "Não foi possível consultar o TMDB."
				}
				onRetry={() => query.refetch()}
				title="Não foi possível carregar o filme"
			/>
		)
	}

	return (
		<MovieDetailsContent
			isPlaceholder={query.isPlaceholderData}
			movie={query.data}
		/>
	)
}

function MovieDetailsContent({
	isPlaceholder,
	movie,
}: {
	isPlaceholder: boolean
	movie: MovieDetailsModel
}) {
	const location = useLocation()
	const navigate = useNavigate()
	const backdropUrl = getMovieBackdropUrl(movie.backdropPath)
	const posterUrl = getMovieImageUrl(movie.posterPath, "w500")
	const runtime = formatMovieRuntime(movie.runtime)
	const [imageStatus, setImageStatus] = useState<
		"loading" | "loaded" | "error"
	>(posterUrl ? "loading" : "error")

	function handleBack() {
		const navigateBack = () => {
			if (location.state?.fromMovieGrid === true) {
				navigate(-1)
				return
			}

			navigate("/", { replace: true })
		}

		if (
			"startViewTransition" in document &&
			!window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			document.startViewTransition(navigateBack)
			return
		}

		navigateBack()
	}

	return (
		<section className="relative -mx-4 -mt-10 min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-10 sm:-mx-6 sm:-mt-14 sm:px-6 sm:py-14 lg:-mx-10 lg:px-10">
			{backdropUrl && (
				<div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] overflow-hidden">
					<img
						alt=""
						className="size-full object-cover opacity-30"
						decoding="async"
						src={backdropUrl}
					/>
					<div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,10,15,0.18),var(--color-canvas))]" />
					<div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-canvas),transparent_55%,var(--color-canvas))]" />
				</div>
			)}

			<div className="relative mx-auto max-w-7xl">
				<button
					className="inline-flex cursor-pointer items-center gap-2 text-sm text-content-muted transition hover:text-content"
					onClick={handleBack}
					type="button"
				>
					<ArrowLeft className="size-4" aria-hidden="true" />
					Voltar
				</button>

				<div className="mt-10 grid items-start gap-8 md:grid-cols-[minmax(14rem,19rem)_1fr] lg:gap-14">
					<div
						className="relative mx-auto aspect-[2/3] w-full max-w-72 overflow-hidden rounded-card border border-border bg-surface-raised shadow-card md:mx-0"
						style={{ viewTransitionName: `movie-poster-${movie.id}` }}
					>
						{posterUrl && imageStatus !== "error" ? (
							<>
								{imageStatus === "loading" && (
									<Skeleton className="absolute inset-0 size-full rounded-none" />
								)}
								<img
									alt={`Pôster de ${movie.title}`}
									className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
										imageStatus === "loaded" ? "opacity-100" : "opacity-0"
									}`}
									onError={() => setImageStatus("error")}
									onLoad={() => setImageStatus("loaded")}
									src={posterUrl}
								/>
							</>
						) : (
							<div className="grid size-full place-items-center text-content-muted">
								<ImageOff className="size-10" aria-hidden="true" />
							</div>
						)}
					</div>

					<div className="pt-1 md:pt-2">
						<p className="text-xs font-bold tracking-[0.18em] text-content-muted uppercase">
							{movie.releaseYear ?? "Ano desconhecido"}
							{runtime && ` · ${runtime}`}
						</p>
						<h1
							className="mt-3 text-4xl font-bold tracking-tight text-content sm:text-5xl lg:text-6xl"
							style={{ viewTransitionName: `movie-title-${movie.id}` }}
						>
							{movie.title}
						</h1>
						{movie.tagline && (
							<p className="mt-3 text-lg text-content-muted italic">
								{movie.tagline}
							</p>
						)}

						<div className="mt-7 flex items-center gap-3">
							<MovieRating rating={movie.voteAverage} />
							<span className="text-sm text-content-muted">/ 10 · TMDB</span>
						</div>

						{movie.genres.length > 0 && (
							<ul className="mt-7 flex flex-wrap gap-2" aria-label="Gêneros">
								{movie.genres.map((genre) => (
									<li
										className="rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand"
										key={genre.id}
									>
										{genre.name}
									</li>
								))}
							</ul>
						)}

						<div className="mt-9 max-w-4xl">
							<h2 className="text-xs font-bold tracking-[0.18em] text-content-muted uppercase">
								Sinopse
							</h2>
							{isPlaceholder ? (
								<div className="mt-4 space-y-3">
									<Skeleton className="h-4 w-full" />
									<Skeleton className="h-4 w-5/6" />
								</div>
							) : (
								<p className="mt-3 text-base leading-7 text-content/90 sm:text-lg sm:leading-8">
									{movie.overview || "Sinopse indisponível."}
								</p>
							)}
						</div>

						{isPlaceholder ? (
							<Skeleton className="mt-7 h-4 w-56" />
						) : (
							<p className="mt-7 text-sm text-content-muted">
								Lançamento:{" "}
								<span className="text-content">
									{formatMovieReleaseDate(movie.releaseDate)}
								</span>
							</p>
						)}

						<div className="mt-8">
							<FavoriteButton
								movieId={movie.id}
								movieTitle={movie.title}
								variant="button"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function MovieDetailsSkeleton({ movieId }: { movieId: number }) {
	return (
		<div aria-label="Carregando detalhes do filme" role="status">
			<Skeleton className="h-5 w-20" />
			<div className="mt-10 grid gap-8 md:grid-cols-[minmax(14rem,19rem)_1fr] lg:gap-14">
				<div
					className="mx-auto aspect-[2/3] w-full max-w-72 md:mx-0"
					style={{ viewTransitionName: `movie-poster-${movieId}` }}
				>
					<Skeleton className="size-full" />
				</div>
				<div className="space-y-5 pt-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-14 w-3/4" />
					<Skeleton className="h-5 w-1/2" />
					<Skeleton className="h-28 w-full" />
					<Skeleton className="h-12 w-52" />
				</div>
			</div>
		</div>
	)
}
