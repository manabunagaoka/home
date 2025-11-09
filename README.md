# Home System (Local Edge TinyLM Demo)

**What this is:**  
A brand-neutral, privacy-first demo of a local “TinyLM” (bigram model) that generates short phonics nudges on-device and plays a clip when the child accepts.

## Run (Codespaces, no installs)
```bash
npm run dev:player

## Customize the Buddy

- Put images in `apps/player/public/buddy/` (e.g., `frame1.png`, `frame2.png`, `frame3.png`).
- Update `apps/player/public/buddy/manifest.json` with the list of filenames in order. The buddy will animate through these frames on a nudge; if none are present, it falls back to the emoji.

## Prompt voice and actions

- In the Parent Card, you can:
	- Toggle “Speak prompt (TTS)” to have the browser voice read the nudge.
	- Choose Action Mode: `Video`, `Website (iframe)`, or `Open Link`.
	- Enter an Action URL. Examples:
		- Video: `./clip.mp4` (place a file in `apps/player/`)
		- Website: `https://example.org`
		- Link: any URL; opens in a new tab
	- Use “Nudge now” to trigger a prompt immediately for testing.

Notes
- Everything runs locally in the browser (no cloud calls).
- Some websites may block embedding in iframes (X-Frame-Options); in that case use “Open Link”.
# home
Home System
