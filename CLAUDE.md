# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

House of Tapez is an e-commerce storefront built on **Shopify Hydrogen** (headless commerce framework) using **Remix** for routing and **React** for the UI. The site targets Spanish-speaking customers selling sports tape products.

## Development Commands

```bash
# Start development server with GraphQL codegen
npm run dev

# Build for production (Oxygen deployment)
npm run build

# Build and preview production build locally
npm run preview

# Lint codebase
npm run lint

# Generate types from GraphQL schemas
npm run codegen
```

## Architecture

### Stack
- **Shopify Hydrogen 2024.1.2** - Headless commerce framework
- **Remix 2.6.0** - File-based routing and server-side rendering
- **React 18** - UI components
- **Tailwind CSS** - Utility-first styling
- **GraphQL** - Storefront and Customer Account APIs
- **Oxygen** - Serverless deployment (Cloudflare Workers)

### Project Structure
```
app/
├── routes/           # Remix file-based routing (34 routes)
├── components/       # React components
│   ├── home/        # Homepage sections (Carousel, PacksBanner, etc.)
│   └── ui/          # Reusable UI components
├── lib/             # Utilities (session, fragments, search, variants)
├── graphql/         # Customer Account API queries
└── styles/          # CSS files (app, navbar, home, product, shop, contact)

server.js            # Oxygen Worker entry - creates Storefront client, cart handler, session
```

### Path Alias
`~/*` maps to `app/*` (configured in jsconfig.json)

### Data Flow
1. **Loaders**: Remix route loaders fetch data via Storefront GraphQL API
2. **Deferred data**: Use `defer()` for above/below-the-fold content separation
3. **Caching**: `storefront.CacheLong()` for menu and static data
4. **Types**: Auto-generated from GraphQL schemas (`storefrontapi.generated.d.ts`, `customer-accountapi.generated.d.ts`)

### Key Patterns
- GraphQL fragments defined inline in route files (`app/lib/fragments.js` for shared fragments)
- Session-based cart management via Hydrogen's cart handler
- Suspense + Await pattern for async data loading
- Mixed JS/TS codebase (routes in JSX, config in TypeScript)

### Styling
- Tailwind CSS for utility classes
- Page-specific CSS files in `app/styles/`
- Framer Motion for animations
- FontAwesome for icons

## Deployment

Automatic deployment to Shopify Oxygen via GitHub Actions on push to main. The workflow is in `.github/workflows/oxygen-deployment-1000014583.yml`.

## Environment

Requires Node.js 18+. Environment variables are managed via Shopify dashboard for Oxygen deployment.
