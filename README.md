# Star Wars Wiki

A simple **Star Wars Wiki** built with [Next.js](https://nextjs.org/).  
Search for characters from the Star Wars universe and view detailed information on each character.
This uses API provided by [swapi.dev](https://swapi.dev).

## Features

- 🔍 Search Star Wars characters
- 👤 Per-character detail pages (server-rendered)
- 🎨 Styled with Tailwind CSS
- 🛠 Mock services for development and tests (SWAPI-like data)
- ✅ Linting and build setup included

## Environment Variables

The project uses `NEXT_PUBLIC_SWAPI_HOST` to determine whether to fetch data from the real [SWAPI](https://swapi.dev) or use mock services.

- If `NEXT_PUBLIC_SWAPI_HOST` **starts with `http`**, the app will use the real SWAPI service.
- Otherwise, the app will fall back to the built-in **mock services**.

### Example

```bash
# Use real SWAPI
NEXT_PUBLIC_SWAPI_HOST=https://swapi.dev/api

# Use mock services (default)
NEXT_PUBLIC_SWAPI_HOST=mock
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 3. Lint the code

```bash
npm run lint
```

### 4. Build for production

```bash
npm run build
```

### 5. Start the production build

```bash
npm start
```

## Project Structure

```
src/
 ├─ app/                # Next.js app routes
 ├─ components/         # Reusable UI components
 ├─ lib/                # Services, interfaces, and mock data
```

## Tech Stack

- [Next.js 15](https://nextjs.org)
- [swapi.dev](https://swapi.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- TypeScript

## Notes

- Character details are fetched server-side on `/characters/[id]`.
- Mock services simulate SWAPI responses for local development.
