# To-Do

## Polish
- [ ] Add dynamic page titles (`document.title`) per route — e.g. "Pikachu — Custom Pokédex"
- [ ] Add a custom 404 page (`<Route path="*">`) with a Pokémon-themed not-found screen
- [ ] Add a React Error Boundary around the routes to gracefully handle crashes
- [ ] Remove leftover `console.log(name)` in `EvolutionChain.tsx`

## Features
- [ ] Kanto region map with clickable routes using React Leaflet and a static image overlay
  - SVG overlay with transparent `<polygon>` elements over each route/town
  - On click, fetch Pokémon encounters from PokeAPI location-area endpoint
  - Build lookup object mapping region names to PokeAPI location-area IDs
- [ ] Evolution sprites flanking the main Pokémon sprite on the details page
  - Lift evolution chain fetch up to `PokemonDetails`
  - Derive prev/next from flat chain array
  - Render as smaller absolute-positioned sprites linking to their detail pages

## Code Quality
- [ ] Tighten TypeScript — remove remaining `any` types and add explicit prop types to all components
- [ ] Standardize cart reducer payloads — `DECREMENT_ITEM` and `ADD_ITEM` accept full item objects but only need the name, inconsistent with `REMOVE_ITEM`

## Content
- [ ] Add supplemental descriptions to special order items in `src/itemSupplements.ts`
- [ ] Update README with live demo URL and GitHub repo URL
