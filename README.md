# Custom Pokédex

A full-stack Pokémon web app built with React and Firebase. Browse all 151 Kanto Pokémon, manage a shop cart, track your inventory, and prepare for expeditions — all backed by real-time data from [PokéAPI](https://pokeapi.co).

**[Live Demo →](https://josiahs-pokedex.netlify.app/)** _(replace with your Netlify URL)_

---

## Features

**Pokédex**

- Browse all 151 Gen 1 Pokémon with search and multi-type filtering
- Detail pages with stats radar chart, evolution chain, abilities, flavor text, and cry audio
- Favorite Pokémon with a Lottie-animated heart button, synced to Firebase in real time
- Filter the Pokédex to show only favorited Pokémon

**Shop**

- Browse items by category (Poké Balls, Medicine, TMs, and more)
- Sort by price or name
- Add to cart, adjust quantities, and check out
- Inventory is saved to Firebase after each order

**Expedition Hub**

- Protected route requiring authentication
- View trainer profile, bag inventory, and upcoming destinations
- Inventory reflects real purchases from the shop

**Authentication**

- Google sign-in and email/password sign-in and sign-up
- Protected routes redirect to login with return-to navigation

---

## Tech Stack

|           |                                                   |
| --------- | ------------------------------------------------- |
| Framework | React 18, TypeScript                              |
| Build     | Vite                                              |
| Routing   | React Router v7                                   |
| Styling   | Tailwind CSS v4                                   |
| Auth      | Firebase Authentication (Google + Email/Password) |
| Database  | Firebase Realtime Database                        |
| Data      | PokéAPI                                           |
| Charts    | Recharts                                          |
| Animation | Lottie (DotLottie React)                          |
| Maps      | React Leaflet                                     |
| Testing   | Vitest + React Testing Library                    |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/custom-pokedex.git
cd custom-pokedex

# Install dependencies
npm install

# Add your Firebase config
# Create src/firebase.js with your project credentials (see Firebase console)

# Start the dev server
npm run dev
```

### Running Tests

```bash
npm test
```

---

## Project Structure

```
src/
├── api/          # PokeAPI and item fetch functions
├── components/   # All React components
├── context/      # AuthContext, CartContext
├── hooks/        # useAddToCart, useUserAvatar
├── images/       # Static SVG assets
├── test/         # Test setup and shared utilities
├── helpers.ts    # Utility functions
├── pokemonTypes.ts
└── shopCategories.ts
```

---

## Notes

- Pokémon data is sourced from [PokéAPI](https://pokeapi.co) — a free, open Pokémon REST API
- Pokémon sprites are served from the official Pokémon asset CDN
- This project is fan-made and not affiliated with Nintendo, Game Freak, or The Pokémon Company
