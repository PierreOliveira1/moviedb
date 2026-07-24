import { useEffect, useEffectEvent, useRef } from "react"

type UseInfiniteScrollOptions = {
	canLoadMore: boolean
	isLoading: boolean
	loadMore: () => Promise<unknown>
}

export function useInfiniteScroll({
	canLoadMore,
	isLoading,
	loadMore,
}: UseInfiniteScrollOptions) {
	const sentinelRef = useRef<HTMLDivElement>(null)
	const loadNextPage = useEffectEvent(() => {
		if (!canLoadMore || isLoading) {
			return
		}

		void loadMore()
	})

	useEffect(() => {
		const sentinel = sentinelRef.current
		if (!sentinel || !canLoadMore || !("IntersectionObserver" in window)) {
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					loadNextPage()
				}
			},
			{ rootMargin: "400px 0px" },
		)

		observer.observe(sentinel)
		return () => observer.disconnect()
	}, [canLoadMore])

	return sentinelRef
}
