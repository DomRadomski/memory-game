# Pokemon Memory Game

A browser-based memory card game built with React, using the [PokéAPI](https://pokeapi.co/) to fetch real Pokémon data.

[View here](https://memory-game-tau-livid-38.vercel.app/)

## What it does

Click each Pokémon card without clicking the same one twice. Every successful click increments your score. Click a duplicate and your score resets — but your best score is saved.

## Purpose

This project was built to consolidate core React concepts learned so far:

- **useState** — managing game state including scores, the Pokémon array, and UI toggles like the rules panel
- **useEffect** — fetching Pokémon data from the PokéAPI on mount, with async `.then()` chains updating state as each request resolves
- **Lifting state up** — `score`, `bestscore`, and the Pokémon array live in the top-level `App` component and are passed down as props, keeping the source of truth in one place
- **Complex state** — each Pokémon is an object `{ name, imgurl, clicked }` inside an array; updating a single field requires mapping over the full array and spreading the changed entry, rather than mutating directly
- **Props and component composition** — the UI is broken into `App`, `Header`, `Counter`, `Pokegrid`, `Pokemon`, and `Rules` components, each with a focused responsibility

## Stack

- React (with hooks)
- PokéAPI — `https://pokeapi.co/api/v2/pokemon/:name`
- Vanilla CSS with media queries for responsiveness

## Running locally

```bash
npm install
npm run dev
```
