# Model Registry Lite

## Technical Decisions

### Architecture Evolution

My goal was to write the most idiomatic next.js code I could.

Initially implemented using Next.js Server Actions, which offered:
- Single round-trip data fetching and UI updates (super cool in my opinion)
- Simplified state management
- Built-in form handling
- Exclusive Server Side Rendering (SSR)

However, I transitioned to a client-side API approach because:
- Server Actions are limited to Next.js applications
- Other systems might need to interact with the model registry. Seems likely we would need this information elsewhere so having it exposed via a traditional api is useful.
- API endpoints provide better interoperability and support (tooling, automatic browser caching etc.)

### Data Fetching Strategy

- Implemented custom data fetching using native `fetch` and React hooks
- Single data fetching point to avoid waterfall effects
- my custom useModels hook allows me to seperate concerns. The hook lets me move data fetching and state management logic out of the components and let them focus on just the view. 
- I decided to keep data fetching and state management together in the same file because in this case, they are tightly coupled so keeping them together kept it clean and simple.

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

## Deployed site here: https://hyperbolic-model-registry-production.up.railway.app/





