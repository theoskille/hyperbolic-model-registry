# Model Registry Lite

## Technical Decisions

### Architecture Evolution

Initially implemented using Next.js Server Actions, which offered:
- Single round-trip data fetching and UI updates
- Simplified state management
- Built-in form handling

However, I transitioned to a client-side API approach because:
- Server Actions are limited to Next.js applications
- Other systems might need to interact with the model registry
- API endpoints provide better interoperability

### Data Fetching Strategy

- Implemented custom data fetching using native `fetch` and React hooks
- Single data fetching point to avoid waterfall effects
- Simple in-memory storage for demonstration purposes
- Easy to extend with persistent storage if needed

### Database Implementation

- Chose SQLite3 (better-sqlite3) for its:
  - Lightweight and embedded nature
  - Synchronous operations (avoiding promise overhead)
  - Zero-configuration setup
  - Single-file storage
  - ACID compliance
- Perfect for this use case as it:
  - Runs on the same device as the backend
  - Provides persistent storage without external dependencies
  - Handles concurrent access efficiently
  - Scales well for the expected data volume

### UI/UX Considerations

- terminal-inspired design
- Responsive layout
- Form validation
- Framework filtering
- Optimistic UI updates for better user experience

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Improvements

- Implement model editing
- Add authentication
- Enhance error handling

## Deployed site here: 

## Run Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




