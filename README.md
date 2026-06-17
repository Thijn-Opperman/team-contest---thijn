# Duolingo Team Competition

An interactive prototype of a Duolingo-style team competition. Users spin a wheel to join Team Blue or Team Red, then explore their team, check standings, and open team leaderboards.

Built as a mobile-first demo — useful for showing the flow to stakeholders, teachers, or designers, and as a starting point for further development.

## Live demo

This project is hosted on **Vercel**.

**[INSERT VERCEL LINK]**

> Replace the placeholder above with your production URL once deployed.

## What it does

1. **Home** — intro screen with Duo and a “Spin the wheel” call to action.
2. **Spin the wheel** (`/team`) — the wheel spins and assigns the user to a team.
3. **My team** (`/team/welcome`) — welcome screen for the assigned team.
4. **Team standings** (`/team/standings`) — side-by-side Team Blue vs Team Red scores.
5. **Leaderboards** — separate rankings for each team.

| Screen | Route |
|---|---|
| Home | `/` |
| Spin the wheel | `/team` |
| My team | `/team/welcome` |
| Team standings | `/team/standings` |
| Blue leaderboard | `/team/leaderboard` |
| Red leaderboard | `/team/leaderboard/red` |

There is also a collapsible nav menu in the top-right corner on team pages for quick jumping between screens.

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**

## Run it locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is taken, Next.js will pick another port — check the terminal output.

Other useful commands:

```bash
npm run build   # production build
npm run start   # run production build locally
npm run lint    # ESLint
```

## Folder structure

```text
app/                          # Next.js routes and global styles
  page.tsx                    # Home / landing page
  team/                       # Team competition flow
    layout.tsx                # Wraps team pages in shared shell + context
    page.tsx                  # Spin the wheel
    welcome/page.tsx
    standings/page.tsx
    leaderboard/page.tsx
    leaderboard/red/page.tsx

src/features/teamCompetition/ # Main feature code
  components/                 # UI building blocks (wheel, cards, buttons, nav)
  screens/                    # Full-screen views
  context/TeamContext.tsx     # Shared state (team assignment, XP, leaderboards)
  navigation/                 # Route map + navigation hook
  constants/teamColors.ts     # Colors, team copy, shared tokens
  hooks/

public/                       # Static assets (Duo, mascots, backgrounds)
```

Routes stay thin — most UI logic lives under `src/features/teamCompetition/`.

## Things to know before continuing

**This is a prototype, not a full product.** Team assignment, XP, and leaderboard data are mocked. State is stored in `localStorage`, so it persists per browser but not across devices or users.

**Leaderboards are mocked.** The “You” row is injected into your assigned team’s leaderboard and is currently hardcoded to show rank **#64** for demo purposes.

**Team balancing on the wheel.** When you spin, the app slightly favours whichever team has been assigned less often on that device. If counts are equal, the result is random.

**Character mapping.** Team Blue uses Junior (`junior.png`). Team Red uses Eddy (`eddy.png`). Copy in `teamColors.ts` should stay in sync with this.

**Mobile-first layout.** Team pages render inside a ~420px phone frame, centred on larger screens. Design and spacing assume that width.

**Next.js 16 differences.** This project uses Next.js 16, which has some API and convention changes compared to older versions. Check `node_modules/next/dist/docs/` if something feels unfamiliar.

**Assets live in `public/`.** Key files: `duo.png`, `junior.png`, `eddy.png`, `wheel-hills-bg.png`, `standings-bg.png`.

**No backend yet.** Natural next steps would be real user data, live XP updates, and server-side team assignment instead of local storage.

## Design direction

Duolingo-inspired: rounded shapes, bold type, green primary buttons, playful blue/red team colours, and light motion (wheel spin, card reveals, winner animation). The goal is clarity and energy, not pixel-perfect parity with the real app.

## Status

Working interactive prototype — suitable for demos, reviews, and as a base to build on. Deployed via Vercel for easy sharing.
