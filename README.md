# Daiyum

Daiyum is a content-driven website built with Next.js, designed to showcase curated video montages and other community/portfolio content.

## Features
- Montage page with category filtering
- In-page video playback (YouTube embed in modal)
- "Load more" progressive rendering for performance
- Data-driven content management (easy to add videos, categories, tags)

## Tech Stack
- Next.js (App Router)
- React
- Tailwind CSS

## Content Management
Videos are maintained in a typed data file (e.g. `data/montages.data.ts`).  
To add a new montage:
1. Upload the video to YouTube (Public or Unlisted)
2. Copy the `youtubeId` from the URL
3. Append a new entry to `montageVideos`

## Getting Started

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

See what it's like?
Go: https://lucas-chu-0209.github.io/daiyum
