# GrowTogether — Demo App CLAUDE.md

## Project Purpose
This is a **case competition demo** for GrowTogether, a mobile-first platform for The Good Acre (TGA), a Minnesota nonprofit food hub. The goal is to **demonstrate the app concept visually** — not build a fully functional product. Prioritize polish, clarity, and visual fidelity over working backend logic.

## The Organization: The Good Acre (TGA)
- Minnesota-based nonprofit food hub, headquartered in Falcon Heights, MN
- Connects 130+ small-scale, BIPOC, immigrant, and emerging farmers to wholesale buyers (schools, hospitals, Lunds & Byerlys, etc.)
- $2.6M+ in purchasing in 2024; 73% to BIPOC growers
- Small grower support team (2–3 advisors) serving 130+ farmers
- Key internal systems: NetSuite (orders), Airtable (farm profiles)

## The App: GrowTogether
A centralized hub replacing scattered TGA touchpoints (phone, email, ad hoc in-person) with one accessible platform. Three core pillars:

### 1. Communication & Community
- Personalized feed (filtered by crop type, location, tech comfort)
- Farmer-to-farmer messaging and crop-specific groups
- TGA broadcast channel (updates, events, market alerts)
- Multilingual: English, Hmong, Spanish, Somali
- Event calendar with RSVP (quarterly in-person retreats)

### 2. Insights & Business Intelligence
- Cost of Production Calculator (Minnesota-specific crop data)
- Live pricing benchmarks and packaging cost guidance
- Fulfillment dashboard (own rate vs. TGA network average)
- Order management (view/confirm purchase orders from TGA)
- Integration hooks for LEAFF, CSA, Lunds & Byerlys, spoke partners

### 3. Education
- Tiered learning modules:
  - Level 1 (Free): Wholesale readiness basics — short videos + quizzes
  - Level 2 (Premium): Advanced business planning — modules + worksheets
  - Level 3 (Premium): Certifications via university partner (UMN)
- Engagement tracking for TGA admin view

## Business Model: Freemium
- **Free**: Community features, TGA feed, Level 1 lessons, basic tools, order confirmations
- **Premium**: Full lesson library, certifications, full calculators, advanced pricing, fulfillment benchmarking

## Demo Priorities
- **Visual-first**: Clean, modern, warm UI that communicates the concept immediately
- **Mock data OK**: Use realistic placeholder data — farmer names, crop types, order numbers, etc.
- **No real backend needed**: Simulate interactions with frontend state/mock data
- **Mobile-first layout**: Design for a phone screen (375px wide), but desktop view is acceptable for demo
- **Show all three pillars**: Each pillar should have at least one representative screen
- **Onboarding flow**: Show the intro survey/personalization step

## Design System

### Color Palette
| Role | Name | Hex |
|------|------|-----|
| Primary Background | White | `#FFFFFF` |
| Primary / Dark Green | Dark Olive Green | `#4A6228` |
| Secondary / Sage | Light Sage Green | `#8FAE6B` |
| Accent / Gold | Olive Gold | `#9B8C00` |
| Highlight / Deep Red | Dark Crimson | `#8B1A1A` |
| Surface / Card Background | Off-White | `#F8F5EF` |
| Body Text | Dark Charcoal | `#1A1A1A` |
| Muted Text | Medium Gray | `#6B6B6B` |

### Color Usage Rules
- White `#FFFFFF` is the dominant color — backgrounds, cards, screen surfaces
- Dark Olive Green `#4A6228` — primary buttons, active tab indicators, key headers
- Sage Green `#8FAE6B` — secondary accents, tags, chips, success states
- Olive Gold `#9B8C00` — callout stats, feature labels, highlights
- Deep Red `#8B1A1A` — sparingly: badges, alerts, locked/premium states
- Off-White `#F8F5EF` — card and section backgrounds for subtle depth
- Never use harsh or bright colors — palette should feel earthy, warm, and trustworthy

### Typography & Feel
- Clean, modern sans-serif fonts
- Warm and approachable — this serves farmers with varying tech comfort
- Simple iconography
- Avoid clutter — generous whitespace

## Target Users (for realistic mock data)
- Small-scale specialty vegetable farmers (1–10 acres) in Minnesota
- BIPOC and immigrant farming communities: Hmong, Latinx, East African farmers
- Varying English proficiency and technology comfort levels
- Example farmer names for mock data: Paj Ntaub Vang, Maria Gonzalez, Abdi Hassan, Lee Xiong, Rosa Flores

## Key Screens to Demo
1. **Onboarding / Intro Survey** — personalization setup
2. **Home Feed** — personalized content, TGA announcements, alerts
3. **Community** — messaging, groups, event calendar
4. **Insights Dashboard** — cost calculator, fulfillment rate, order management
5. **Education Hub** — module library, progress tracking, premium upsell
6. **Profile / Settings** — language, preferences, premium status

## Tech Stack
- **Framework:** React 18 + Vite 5
- **Styling:** Tailwind CSS v3 (custom TGA color palette defined in tailwind.config.js)
- **Charts:** Recharts (bar charts for fulfillment data)
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts, falls back to system-ui)

### Running the Demo
```bash
npm install
npm run dev
```
Opens at http://localhost:5173

### File Structure
```
src/
  App.jsx         # Phone frame shell + navigation + screen router
  data.js         # ALL mock data (farmer profile, orders, events, etc.)
  index.css       # Tailwind imports + scrollbar styling
  main.jsx        # React entry point
  screens/
    Onboarding.jsx  # 4-step personalization quiz
    Home.jsx        # Personalized feed + quick stats
    Community.jsx   # Groups, messages, events
    Insights.jsx    # KPI cards, fulfillment chart, orders, cost calculator
    Education.jsx   # Module library, progress tracking, premium upsell
    Profile.jsx     # Farm profile, stats, settings
```

### Demo Skill Guidelines (from demo-dev-SKILL.md)
- **Stack:** React + Tailwind + Recharts in modular files
- **Data:** All fake data lives in `src/data.js` at the top — easy to update
- **"Aha moments":** Onboarding quiz personalization, Cost of Production Calculator (interactive), Fulfillment rate vs. network average chart
- **Polish over features:** Beautiful phone frame on desktop background, smooth transitions, hover states on all buttons
- **Offline ready:** Only Google Fonts requires internet (graceful fallback to system-ui)
- **Demo flow:** Onboarding (4 steps) → Home Feed → navigate all 5 sections via bottom tab bar

### Updating Mock Data
To change farmer name, crops, numbers, orders, etc. — edit `src/data.js` only.
All screens pull from this central file.

### Iterating on a Screen
Each screen is its own isolated file in `src/screens/`. Edit one file without touching others.

## Notes
- Phone frame is 390x844px (iPhone 14 size) centered on a dark green background
- Bottom tab bar: Home, Community, Insights, Learn, Profile
- Custom Tailwind colors: `tga-green`, `tga-sage`, `tga-gold`, `tga-red`, `tga-offwhite`, `tga-charcoal`, `tga-muted`
