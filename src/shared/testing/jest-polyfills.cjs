const { Blob, File } = require("node:buffer")
const { ReadableStream, TransformStream } = require("node:stream/web")
const { TextDecoder, TextEncoder } = require("node:util")
const { BroadcastChannel, MessagePort } = require("node:worker_threads")

Object.assign(globalThis, {
	Blob,
	BroadcastChannel,
	File,
	MessagePort,
	ReadableStream,
	TextDecoder,
	TextEncoder,
	TransformStream,
})

const { fetch, FormData, Headers, Request, Response } = require("undici")

Object.assign(globalThis, {
	fetch,
	FormData,
	Headers,
	Request,
	Response,
})
