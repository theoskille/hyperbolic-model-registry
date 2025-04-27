# Model Registry Lite

A lightweight, terminal-inspired registry for tracking machine learning models.

**Live Demo:** [https://hyperbolic-model-registry-production.up.railway.app/](https://hyperbolic-model-registry-production.up.railway.app/)

## Quick Start

```bash
# Install dependencies
npm install

# Fire up the dev server
npm run dev

# Point your browser to
http://localhost:3000
```

## Technical Journey

### API Evolution

My goal was to write the most idiomatic Next.js code I could.

The big decision I had to make was whether to use Next.js Server Actions OR Traditional Client-Side data fetching.

### Server Actions vs. Client-Side Fetching

This decision involved several tradeoffs:

**Server Actions advantages:**
- Single round-trip data fetching and UI updates (super cool in my opinion)
- Simplified state management with less boilerplate
- Built-in form handling that just works
- Exclusive Server Side Rendering (SSR) for better SEO and initial load performance

**Client-side data fetching advantages:**
- More universal approach that works beyond Next.js
- Better tooling support and ecosystem compatibility
- Familiar patterns for most developers
- More explicit separation of concerns


Started with Next.js Server Actions for their elegant one-round-trip data updates, but pivoted to a client-side data fetching approach for several reasons:

- **Interoperability:** Standard APIs can talk to anything, not just Next.js apps
- **Ecosystem Support:** Better tooling, automatic browser caching, etc.
- **Future-proofing:** Other systems might need to interact with the model registry. Seems likely we would need this information elsewhere so having it exposed via a traditional API is useful
- **Doc Requirments Wording** in the requirments for this project, the wording implied that I should use client side fetching.

### Data Strategy

Built a tight but flexible data layer:

- Custom `useModels` hook separates concerns nicely
- Single data fetching point prevents waterfalls
- Kept data fetching + state management bundled together (they're tightly coupled here)

### Why SQLite3?

Chose SQLite3 (via better-sqlite3) because it's:

- Embedded and lightweight
- Synchronous (no promise overhead)
- Zero-config
- Single-file storage
- ACID compliant

Perfect for this use case - runs on the same machine as the backend with persistent storage and no external dependencies.

### UI/UX Choices

- Terminal-inspired design for that dev-friendly feel
- Responsive layout
- Form validation
- Framework filtering
- Optimistic UI updates for snappy interactions

## Future considerations

- Model editing functionality
- Authentication layer
- More robust error handling
- Pagination/infinite scroll for when the registry gets huge