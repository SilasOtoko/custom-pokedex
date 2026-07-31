# To-Do

## Polish

- [ ] Mobile responsiveness

## Features

- [ ] Kanto region map with clickable routes using React Leaflet and a static image overlay
    - SVG overlay with transparent `<polygon>` elements over each route/town
    - On click, fetch Pokémon encounters from PokeAPI location-area endpoint
    - Build lookup object mapping region names to PokeAPI location-area IDs

## Profile

- [ ] Let users edit their trainer address on the Profile page
    - Fetch `users/${uid}/profile` on mount and display current address, city, region
    - Toggle between view and edit mode
    - Save with `update()` (not `set()`) to avoid overwriting other profile fields
    - Move `REGIONS` array to `src/constants.ts` and import it in both Profile and Checkout

## Content

- [ ] Add more supplemental descriptions to special order items in `src/itemSupplements.ts`
