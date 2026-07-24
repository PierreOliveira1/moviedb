import { afterAll, afterEach, beforeAll } from "@jest/globals"
import "@testing-library/jest-dom/jest-globals"

import { server } from "./server"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
