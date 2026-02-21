# GrowTogether Demo

Interactive app demo for The Good Acre — case competition prototype.

## How to Run

1. Open a terminal in this folder
2. Run: `npm install`
3. Run: `npm run dev`
4. Open http://localhost:5173 in your browser

## How to Change Content

All fake data (farmer name, orders, prices, events, etc.) lives in one file:
**`src/data.js`** — edit anything there and the browser updates instantly.

## Screens

| Screen | File | What it Shows |
|--------|------|---------------|
| Onboarding | `src/screens/Onboarding.jsx` | 4-step personalization quiz |
| Home Feed | `src/screens/Home.jsx` | Personalized content + quick stats |
| Community | `src/screens/Community.jsx` | Groups, messages, events + RSVP |
| Insights | `src/screens/Insights.jsx` | KPI cards, fulfillment chart, orders, cost calculator |
| Education | `src/screens/Education.jsx` | Module library, progress, premium upsell |
| Profile | `src/screens/Profile.jsx` | Farm info, stats, settings |

## Demo Tips

- **Start on onboarding** — click through the 4 steps to show personalization
- **Hero moment on Insights** — tap "Cost of Production Calculator", fill in the numbers, click Calculate
- **RSVP on Community** — tap RSVP on an event to show the interaction
- **Expand feed cards on Home** — tap any card to reveal details + progress bar
- **Offline?** — only Google Fonts needs internet; the app itself works offline
