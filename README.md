# Home System (Local Edge TinyLM Demo)

Brand-neutral, privacy-first demo of a local “TinyLM” (bigram model) that generates short phonics nudges on-device; a Kid accepts to play a short YouTube clip. Static HTML + ES Modules; no backend.

## Quick start (Codespaces, no installs)
```bash
npm run dev
```
What happens:
- Starts a static server (port 3000 or 3001 fallback).
- Automatically opens the Home controller at `/home.html`.
- Prints direct links for the Kid view and an optional legacy demo.

If auto-open doesn’t trigger, manually open:
- Home controller: https://{codespace}-{port}.app.github.dev/home.html
- Kid view: https://{codespace}-{port}.app.github.dev/kid.html

## Today’s work (2025-11-09)
- Created a modern Home controller (`apps/player/home.html`) with:
  - Routine tiles (Morning, Phonics, Movement, Read, Wind-down)
  - Caregiver side drawer for Phonics with TinyLM-generated variants, cooldown, and Send-to-Kid
  - Simulated time slider (influences availability/cooldowns)
- Built a standalone Kid page (`apps/player/kid.html`) that:
  - Polls localStorage for pending nudges
  - Shows accept/decline UI; plays YouTube on accept
  - Loads buddy avatar via manifest; includes fallbacks
- TinyLM package (`packages/tiny-lm/index.js`) used in-browser to propose phonics lines from `content/phonics/corpus.txt`.
- Simplified dev flow:
  - New `npm run dev` that auto-opens the correct page and falls back between ports
  - Helper `tools/dev-player.js` updated to be Codespaces-aware
- Fixed buddy asset pathing and manifest to prevent 404s.

## How the demo works
- Communication: Home writes a pending nudge into `localStorage`; Kid polls and reacts.
- Phonics: Drawer uses TinyLM bigram to generate kid-friendly lines (with light guardrails + cooldown). Caregiver can pick variants and Send.
- Video: YouTube embed autoplays on Accept (ID `IMk39Yw3o7U`).

## Repo layout (selected)
- `apps/player/home.html` – Home controller UI (tiles, drawer, sim-time)
- `apps/player/kid.html` – Kid phone UI, plays video on accept
- `apps/player/public/buddy/manifest.json` – Buddy frame list
- `packages/tiny-lm/index.js` – Bigram model (Laplace smoothing, temperature)
- `content/phonics/corpus.txt` – TinyLM seed corpus (S sound)
- `tools/dev-player.js` – Dev launcher (port detect + auto-open)

## Customize the Buddy
- Place images in `apps/player/public/buddy/png/` (e.g., `1_Elmo.png` …)
- Update `apps/player/public/buddy/manifest.json` with the ordered list. The first entry becomes the avatar.

## Limitations (current demo)
- Uses `localStorage` polling; not real-time messaging.
- TinyLM is a simple character bigram model; content quality is playful, not curriculum-grade.
- YouTube autoplay depends on browser policy; may require interaction.

## Next actions (shortlist)
1) UI polish and UX
	- Micro-interactions on tiles, better empty states, clear feedback when a nudge is sent/received
	- Accessible focus states and keyboard navigation
	- Dark/light theme toggle
2) Real nudge transport
	- Replace `localStorage` polling with `BroadcastChannel` for same-origin tabs
	- Optional: Service Worker + postMessage for offline queue simulation
3) Content layer
	- Add a content manifest (JSON) enumerating routines, assets, and constraints
	- Separate caregiver-facing copy vs kid-facing prompts
4) TinyLM for phonics lessons
	- Expand corpus per-letter with explicit patterning (onset-rime, minimal pairs)
	- Introduce templated prompts with slots (letter, word list) + TinyLM variation
	- Simple “lesson” state machine (introduce → model → try → praise → generalize)
5) Home logic
	- Cooldown and eligibility by routine, not just Phonics; incorporate simulated time windows more richly
	- Persist daily timeline/log in `localStorage`
6) Comms and observability
	- Add event log overlay in Kid view and receipt acks back to Home without polling
	- Lightweight analytics stub (local only) to count accepts/declines per routine
7) Packaging & tests
	- Add minimal unit tests for the TinyLM functions
	- Prettier/ESLint and a simple CI check (optional)

## Troubleshooting
- If port 3000 is in use, the launcher uses 3001 automatically. The terminal prints the exact URLs.
- If the browser didn’t open, copy the Home/Kid URLs printed in the terminal.
- If the buddy image doesn’t show, verify `manifest.json` matches the filenames under `public/buddy/png/`.

## Scripts
- `npm run dev` – Start server, auto-open Home controller
- `npm run dev:player` – Start server on port 3000
- `npm run dev:player:alt` – Start server on port 3001
- `npm run dev:player:auto` – Start server with auto port (no auto-open)
