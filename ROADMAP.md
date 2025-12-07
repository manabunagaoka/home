# Home System Roadmap

## Q1 Focus
- UI/UX polish: micro-interactions, accessible focus states, dark/light theme
- Real-time nudges: BroadcastChannel replace localStorage polling; kid→home acks
- Content layer: JSON manifests per routine; caregiver vs kid copy separation
- Phonics lessons: per-letter corpora, templated prompts, simple lesson state

## Engineering
- TinyLM: extend with word-level n-grams, temperature controls per slot
- Messaging: Service Worker prototype for offline queue; structured events
- Observability: local analytics counters (accept/decline per routine)
- Testing & quality: unit tests for TinyLM; Prettier/ESLint; minimal CI

## Stretch
- Buddy animations: frame timing, idle/active states, simple lip-sync mock
- Device integration: PWA install; background sync; limited offline cache
- Safety & privacy: clear local-only indicators; content curation hooks

## Milestones
- M1: BroadcastChannel nudges live, enhanced phonics corpus
- M2: Lesson flow UX, analytics counters, tests in CI
- M3: Theming + accessibility complete; PWA prototype
