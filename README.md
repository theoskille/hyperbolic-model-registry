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


## Database

I chose to go with sqlite3. More specifically, the better-sqlite3 implementation. Sqlite is lightweight, fast, and is embedded on the same device where our backend api will run.
This implementation is built to be synchronous and avoids the overhead of promises. 



