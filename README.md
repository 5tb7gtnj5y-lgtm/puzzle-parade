# Puzzle Parade

A responsive, installable picture-card puzzle game. Drag any two cards to swap them, or select two cards by touch or keyboard.

## Play

- 306 pictures: 6 original painted scenes and 300 individually seeded vector travel illustrations, in Coast, Gardens, Nature and Places.
- Four sizes per picture: 9, 16, 25 or 36 cards. Rewards: 30, 60, 100 or 150 tokens.
- Timer, completion time and personal best for each picture and difficulty.
- Beginner at the start of each run, Learner after 3 solves and Expert after 6.
- 14 simulated rivals with varied names, avatars and speeds. This is a clearly disclosed solo league, not live multiplayer.
- Start New Run resets the active puzzle, league points and promotions. Lifetime tokens, collection and personal bests remain.
- Free hints, full picture preview, pause, optional gentle sounds and a daily bonus.
- Browser-local saves: name, avatar, tokens, unfinished puzzle and records persist on that device. No account, database or cross-device synchronization.
- Offline play after the service worker finishes caching the game. External fonts are optional; system fonts work offline.

## Development and validation

No runtime packages or build tool are required. Run `npm run build`, then serve `dist/` with a static HTTP server.

```
npm test
npm run build
```

Tests cover all library entries, card permutation and solvability for every difficulty, arbitrary swaps, one-time rewards, daily bonuses, promotions, reset persistence, saved puzzle restoration, rivals and timing records.

## Hosting

Cloudflare Pages is connected to this GitHub repository. Production branch: `main`; output directory: `dist`; build command: `npm run build`. Pushing changes to `main` triggers a fresh production deployment.

No API keys or paid AI inference are used while playing. Rivals and the vector illustration library are generated locally. Do not change the localStorage key if preserving saved games across updates.

## Artwork

The six painted scenes were generated for this game using the built-in image generation tool. Prompt: six detailed storybook travel scenes in a 3-by-2 sheet: harbour, English cottage garden, forest waterfall, winter village, hot-air balloons and nighttime canal. The remaining 300 pictures are original seeded SVG travel illustrations rendered by `illustrations.js`.

## Accessibility

Cards support keyboard selection with Enter or Space, arrow-key navigation, Escape to clear selection, and live progress announcements. Animations respect reduced-motion preferences.


Play the live game: https://puzzle-parade.pages.dev/
