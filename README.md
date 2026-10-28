# Puzzle Parade

A responsive, installable picture-card puzzle game. Drag any two cards to swap them, or select two cards by touch or keyboard.

## Play

- 384 pictures and 1,536 challenges: 60 licensed Polish paintings and photographs, 24 original painted scenes and 300 individually seeded vector travel illustrations.
- Poland collection: 24 classic paintings (four each by Jan Matejko, Józef Chełmoński, Stanisław Wyspiański, Jacek Malczewski, Aleksander Gierymski and Olga Boznańska), 24 city views and 12 landscapes/landmarks. Filters: Poland, Polish art, Polish cities and Polish scenes. Search accepts artist names and unaccented place names.
- Cats, Dogs and Animals collections each have six traditional jigsaw-style paintings, alongside Coast, Gardens, Nature and Places.
- Four sizes per picture: 9, 16, 25 or 36 cards. Rewards: 30, 60, 100 or 150 tokens.
- Timer, completion time and personal best for each picture and difficulty.
- Beginner at the start of each run, Learner after 3 solves and Expert after 6.
- 14 simulated rivals with varied names, avatars and speeds. This is a clearly disclosed solo league, not live multiplayer.
- Start New Run resets the active puzzle, league points and promotions. Lifetime tokens, collection and personal bests remain.
- Free hints, full picture preview, pause, optional gentle sounds and a daily bonus.
- Browser-local saves: name, avatar, tokens, unfinished puzzle and records persist on that device. No account, database or cross-device synchronization.
- The core game and original paintings are cached for offline play. New Poland images are cached as you view them; open a picture online before playing it offline. External fonts are optional; system fonts work offline.

## Development and validation

No runtime packages or build tool are required. Run `npm run build`, then serve `dist/` with a static HTTP server.

```
npm test
npm run build
```

Tests cover all library entries, card permutation and solvability for every difficulty, arbitrary swaps, one-time rewards, daily bonuses, promotions, reset persistence, saved puzzle restoration, rivals and timing records.

## Hosting

Cloudflare Pages is connected to this GitHub repository. Production branch: `main`; output directory: `dist`; build command: `npm run build`. After updating `main`, verify the production deployment succeeds. If the Git integration does not start a build, trigger a Pages deployment for `main` through the Cloudflare API.

No API keys or paid AI inference are used while playing. Rivals and the vector illustration library are generated locally. Do not change the localStorage key if preserving saved games across updates.

## Artwork

The 60 Poland images are authentic public-domain paintings and freely licensed photographs sourced from Wikimedia Commons. Each entry in `poland.js` retains its creator, licence, licence URL and original file URL. These credits appear in the difficulty chooser, full preview, game reference panel and Settings → Image credits. Images are resized to WebP, and gallery thumbnails may be cropped; puzzle boards preserve the original composition and aspect ratio. See [POLAND_IMAGE_CREDITS.md](POLAND_IMAGE_CREDITS.md) for the full list.

The 24 original painted scenes were generated for this game using the built-in image generation tool. They include six travel scenes and 18 animal scenes. The remaining 300 pictures are original seeded SVG travel illustrations rendered by `illustrations.js`.

## Accessibility

Cards support keyboard selection with Enter or Space, arrow-key navigation, Escape to clear selection, and live progress announcements. Animations respect reduced-motion preferences.


Play the live game: https://puzzle-parade.pages.dev/

The new painted collections feature kittens, Persian cats, cottage cats, retrievers, pugs, collies, spaniels, dachshunds, fireside dogs, foxes, horses, safari animals, red pandas, birds, rabbits and a hedgehog.
