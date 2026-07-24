import type { ReactNode } from "react"

type HighlightedTitleProps = {
	query: string
	title: string
}

export function HighlightedTitle({ query, title }: HighlightedTitleProps) {
	const normalizedQuery = query.toLocaleLowerCase("pt-BR")
	const normalizedTitle = title.toLocaleLowerCase("pt-BR")

	if (!normalizedQuery) {
		return title
	}

	const parts: ReactNode[] = []
	let cursor = 0
	let matchIndex = normalizedTitle.indexOf(normalizedQuery)

	while (matchIndex !== -1) {
		if (matchIndex > cursor) {
			parts.push(title.slice(cursor, matchIndex))
		}

		const matchEnd = matchIndex + query.length
		parts.push(
			<mark
				className="rounded-sm bg-brand/20 px-0.5 text-brand"
				key={`${matchIndex}-${title.slice(matchIndex, matchEnd)}`}
			>
				{title.slice(matchIndex, matchEnd)}
			</mark>,
		)
		cursor = matchEnd
		matchIndex = normalizedTitle.indexOf(normalizedQuery, cursor)
	}

	if (cursor === 0) {
		return title
	}

	if (cursor < title.length) {
		parts.push(title.slice(cursor))
	}

	return parts
}
