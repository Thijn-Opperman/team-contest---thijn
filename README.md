# Duolingo Team Competition

Een interactief prototype voor een Duolingo-achtige teamcompetitie. Gebruikers spinnen een rad en worden toegewezen aan Team Blue of Team Red. Daarna kunnen ze hun team bekijken, de teamstanden volgen en leaderboards openen.

## Voor wie is dit project?

Dit project is bedoeld voor:

- Stakeholders die snel willen begrijpen hoe de feature werkt.
- Docenten/begeleiders die het concept, de flow en technische uitvoering willen beoordelen.
- Niet-technische kijkers die de applicatie willen openen en testen.
- Developers die lokaal verder willen bouwen.

## Korte samenvatting

De feature simuleert een Duolingo-teamcompetitie:

1. De gebruiker start op een rustige homepagina.
2. Via `Spin the wheel` opent het rad.
3. Het rad wijst de gebruiker toe aan Team Blue of Team Red.
4. De gebruiker ziet een team-welkomstscherm.
5. Daarna kan de gebruiker teamstanden en leaderboards bekijken.

De stijl is geïnspireerd op Duolingo: afgeronde vormen, stevige typografie, groene CTA-knoppen, kaartjes met een 3D-rand en zachte speelse kleuren.

## Belangrijkste schermen

### Home

Een minimale startpagina met Duo en één duidelijke actie: `Spin the wheel`.

### Spin the wheel

Een visueel rad met rode en blauwe segmenten. Het rad draait automatisch en landt op het gekozen team.

De toewijzing is niet puur visueel. De applicatie houdt lokaal bij hoe vaak blauw en rood zijn gekozen. Als één team minder vaak is gekozen, krijgt dat team voorrang. Als beide teams gelijk staan, kiest de app willekeurig.

### Team welcome

Een welkomstscherm voor het toegewezen team. Dit scherm toont de mascotte, teamnaam en korte uitleg.

### Team standings

Een scoreboard met de huidige XP van Team Blue en Team Red. Vanuit dit scherm kan de gebruiker ook naar het eigen team gaan.

### Leaderboards

Er zijn aparte leaderboards voor:

- Team Blue: `/team/leaderboard`
- Team Red: `/team/leaderboard/red`

## Navigatieflow

| Pagina | Route | Doel |
|---|---|---|
| Home | `/` | Startpagina |
| Spin the wheel | `/team` | Teamtoewijzing |
| My team | `/team/welcome` | Welkomstscherm van toegewezen team |
| Team standings | `/team/standings` | Scoreboard |
| Blue leaderboard | `/team/leaderboard` | Ranking Team Blue |
| Red leaderboard | `/team/leaderboard/red` | Ranking Team Red |

Daarnaast is er rechtsboven een uitklapmenu waarmee je snel tussen de pagina's kunt navigeren.

## Designkeuzes

- **Duolingo-stijl:** ronde vormen, speelse kleuren en duidelijke knoppen.
- **Leesbaarheid:** lichte kaarten met donkere tekst waar nodig, zodat tekst niet wegvalt op drukke achtergronden.
- **Mobiel eerst:** de applicatie is ontworpen voor een smalle mobiele viewport.
- **Subtiele animaties:** het rad draait automatisch en UI-elementen komen rustig in beeld.
- **Echte assets:** Duo, Eddy en Junior worden gebruikt vanuit de `public/` map.

## Technische stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

## Project starten

Installeer eerst de dependencies:

```bash
npm install
```

Start daarna de ontwikkelserver:

```bash
npm run dev
```

Open vervolgens de lokale URL die in de terminal verschijnt, meestal:

```bash
http://localhost:3000
```

Als poort `3000` al bezet is, gebruikt Next.js automatisch een andere poort, bijvoorbeeld `3001`.

## Testen

De volgende checks zijn uitgevoerd:

```bash
npm run lint
npm run build
```

Wat deze checks doen:

- `npm run lint` controleert codekwaliteit en veelvoorkomende fouten.
- `npm run build` controleert of de applicatie productie-klaar compileert.

Laatste resultaat:

- Lint: geslaagd
- Build: geslaagd
- Alle routes worden succesvol opgebouwd.

## Assets

De gebruikte afbeeldingen staan in:

```text
public/
  duo.png
  eddy.png
  junior.png
```

Deze afbeeldingen worden gebruikt voor Duo en de teammascottes.

## Belangrijke bestanden

```text
app/
  page.tsx
  team/
    page.tsx
    welcome/page.tsx
    standings/page.tsx
    leaderboard/page.tsx
    leaderboard/red/page.tsx

src/features/teamCompetition/
  components/
  context/
  navigation/
  screens/
  constants/
```

## Wat is nog uitbreidbaar?

Mogelijke vervolgstappen:

- Echte gebruikersdata koppelen aan de leaderboards.
- XP live laten bijwerken vanuit een backend.
- Teamtoewijzing server-side opslaan in plaats van lokaal.
- Meer officiële Duolingo-assets toevoegen.
- Een echte end-to-end testset toevoegen met Playwright of Cypress.

## Status

Dit is een werkend interactief prototype. Het is geschikt om de featureflow, visuele richting en interactie te demonstreren aan stakeholders en docenten.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
