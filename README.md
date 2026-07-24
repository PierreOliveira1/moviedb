# MovieDB

A React Router, React 19, and TypeScript SPA for discovering and organizing movies.

## Requirements

- Node.js 22.12 or later
- pnpm 10 or later

## Development

Create a local `.env` file with a TMDB API read access token:

```text
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
```

Then install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The development server provides hot reload and SPA fallback. Routes opened directly in the browser, including unknown routes handled by `src/routes/$/route.tsx`, work without server-side redirects.

## Local Build

```bash
pnpm build
pnpm preview
```

The client-side build is generated in `build/client`. For static hosting, configure all unknown URLs to serve `build/client/index.html`.

## Scripts

- `pnpm dev`: starts the development server.
- `pnpm build`: creates the SPA build.
- `pnpm start` or `pnpm preview`: serves the build locally.
- `pnpm typecheck`: generates route types and validates TypeScript.
- `pnpm check`: validates formatting, lint rules, and imports with Biome.
- `pnpm lint`: runs the Biome linter.
- `pnpm format`: formats the project with Biome.
- `pnpm format:check`: checks formatting without modifying files.
- `pnpm test`: runs the test suite once.
- `pnpm test:watch`: runs tests in interactive watch mode.
- `pnpm test:coverage`: runs tests with coverage.
- `pnpm validate`: runs Biome, TypeScript, tests, and the production build.

Husky automatically runs `pnpm validate` before every `git push`.
