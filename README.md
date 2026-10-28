# Puzzle Parade

A responsive, installable picture-card puzzle game. Drag any two cards to swap them, or select two cards by touch or keyboard.

## Play

- 387 pictures and 1,542 challenges: three generated Very Hard texture images, 60 licensed Polish paintings and photographs, 24 original painted scenes and 300 individually seeded vector travel illustrations.
- Poland collection: 24 classic paintings (four each by Jan Matejko, Józef Chełmoński, Stanisław Wyspiański, Jacek Malczewski, Aleksander Gierymski and Olga Boznańska), 24 city views and 12 landscapes/landmarks. Filters: Poland, Polish art, Polish cities and Polish scenes. Search accepts artist names and unaccented place names.
- Cats, Dogs and Animals collections each have six traditional jigsaw-style paintings, alongside Coast, Gardens, Nature and Places.
- Standard pictures have four sizes: 9, 16, 25 or 36 cards. Rewards: 30, 60, 100 or 150 tokens.
- Very Hard collection: a plate of baked beans, a whole lot of grass and nothing but sand. Choose 36 cards for 150 tokens or 64 cards for 250 tokens; the default is 64. Hints, preview, timer, records and local saves work for both sizes.
- Timer, completion time and personal best for each picture and difficulty.
- Beginner at the start of each run, Learner after 3 solves and Expert after 6.
- 14 simulated rivals with varied names, avatars and speeds. This is a clearly disclosed solo league, not live multiplayer.
- Start New Run resets the active puzzle, league points and promotions. Lifetime tokens, collection and personal bests remain.
- Free hints, full picture preview, pause, optional gentle sounds and a daily bonus.
- Browser-local saves: name, avatar, tokens, unfinished puzzle and records persist on that device. No account, database or cross-device synchronization.
- The core game and original paintings are cached for offline play. Poland and Very Hard images are cached as you view them; open a picture online before playing it offline. External fonts are optional; system fonts work offline.

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

The three Very Hard images are original photorealistic assets made with the built-in image-generation tool. Asset paths: `vh-beans.webp`, `vh-grass.webp`, `vh-sand.webp`. Prompts: overhead close-ups of a plate filled with baked beans, dense green lawn grass, and fine golden sand with subtle wind ripples; sharp repeating texture throughout, no text, watermarks or added objects. The complete prompt set is retained in `VERY_HARD_ARTWORK.md`.

The 24 original painted scenes were generated for this game using the built-in image generation tool. They include six travel scenes and 18 animal scenes. The remaining 300 pictures are original seeded SVG travel illustrations rendered by `illustrations.js`.

## Accessibility

Cards support keyboard selection with Enter or Space, arrow-key navigation, Escape to clear selection, and live progress announcements. Animations respect reduced-motion preferences.


Play the live game: https://puzzle-parade.pages.dev/

The new painted collections feature kittens, Persian cats, cottage cats, retrievers, pugs, collies, spaniels, dachshunds, fireside dogs, foxes, horses, safari animals, red pandas, birds, rabbits and a hedgehog.

## Affiliate promotion

A compact shopping-bag icon at the top cycles through the four supplied Amazon affiliate links every 10 seconds. The destination stays fixed while hovered or keyboard-focused, while a game dialog is open, while the disclosure is open, and when the page is hidden. A pause/resume button lets visitors stop rotation. Links open in a separate tab with `sponsored noopener noreferrer`. The visible Ad label and adjacent disclosure identify the promotion. No Amazon scripts, image requests or tracking pixels load with the game. Update destinations in `affiliate.js`.
