# Spaces with Nexus

Spaces with Nexus is a room-planning product that helps people make more considered decisions about their living and working spaces. Enter room measurements, arrange the furniture you own on a scaled floor plan, and explore AI-assisted layout proposals before moving anything.

## Product capabilities

- Build a floor plan using room dimensions in centimetres
- Add, resize, rotate, move and arrange furniture
- Snap positions to a 5 cm grid and align furniture with room walls
- Identify overlapping pieces and furniture extending beyond room boundaries
- Generate layout proposals from a written goal and preview them before applying
- Undo and redo layout changes, save plans in the current browser, and print or export a JSON copy

## Technology

- React, TypeScript and Vite
- SVG floor plan with CSS design tokens in `src/styles/base.css`
- Vercel serverless function for AI-assisted layout suggestions

## Project structure

```
api/suggest-layout.ts   Serverless route for layout suggestions
src/planner/            Planner state, floor plan drawing, geometry and storage
src/site/               Home, how it works, about and privacy pages
src/styles/             Tokens and base styles, site styles, planner styles
src/brand.ts            Product name and storage keys
```

## Local development

```bash
npm install
npm run dev
```

Room editing, furniture placement, local saving and export work without an AI API key. To run the serverless layout suggestion endpoint locally, use the Vercel CLI:

```bash
npx vercel dev
```

Set `OPENAI_API_KEY` in the Vercel project environment. `OPENAI_MODEL` is optional and defaults to `gpt-4.1-mini`. Keep the API key out of any `VITE_*` variable and out of the repository.

## Deployment

The production domain is [spaceswithnexus.com](https://spaceswithnexus.com/). `vercel.json` rewrites non-API paths to `index.html`, allowing direct links such as `/workspace` and `/how-it-works` to work after a refresh.

## Planning responsibly

Furniture dimensions are entered manually, so measure your room and furniture carefully. Doors, windows and other fixed features cannot currently be placed on the plan. The planner flags overlaps and furniture outside the room, but does not verify walkway clearance, door access, accessibility requirements or building-code compliance. Review the proposed layout in the real space before moving furniture.

Plans are saved in the current browser. They are not attached to an account or automatically synced between devices; use the export or print options to keep a copy.

## Brand

The product name and storage keys are defined in `src/brand.ts`.
