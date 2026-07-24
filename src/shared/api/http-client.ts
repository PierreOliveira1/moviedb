import { HttpError } from "./http-error"

export async function httpClient<T>(
	url: string,
	options?: RequestInit,
): Promise<T> {
	const response = await fetch(url, options)

	if (!response.ok) {
		throw new HttpError(response.status, response.statusText)
	}

	return (await response.json()) as T
}
