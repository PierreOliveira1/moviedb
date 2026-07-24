export class HttpError extends Error {
	constructor(
		public readonly status: number,
		public readonly statusText: string,
	) {
		super(`Request failed with status ${status} ${statusText}`)
		this.name = "HttpError"
	}
}
