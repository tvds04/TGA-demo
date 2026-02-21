---
name: demo-dev
description: Build frontend app demos for case competition presentations. Use this skill when the team needs a working prototype, interactive demo, or UI mockup to accompany their case presentation. Trigger on "build a demo", "create a prototype", "make an app", "interactive demo", "show the UI", "frontend", "dashboard", "web app", "mock app", "demo the product", "visualize the solution", or any request to build something interactive for a case competition. Also trigger when the user wants to make their recommendation more tangible or "real" for judges.
---

# Frontend App Demo Development for Case Competitions

Build interactive demos that make abstract recommendations concrete, impressive, and memorable for judges. A well-executed demo can be the single most differentiating element of a case competition presentation — it shows you didn't just *think* about the solution, you *built* it.

## Core Principle: Demos Win Cases

Judges see dozens of slide decks. A functional, polished demo signals:
- Technical credibility ("they actually know how to build this")
- Confidence in the recommendation ("they committed to it enough to demo it")
- Better communication of complex ideas (showing beats telling)

The demo doesn't need to be production-ready — it needs to be *convincing*. Focus ruthlessly on the happy path and the moments judges will see.

---

## What Makes a Great Case Competition Demo

### The "Aha Moment" Rule
Every demo should have 1–2 moments that make judges say "oh, that's clever." Design toward those moments. Everything else is scaffolding.

### Realistic, Not Fake
Use real-looking data — company-specific names, plausible numbers, industry-appropriate terminology. Generic placeholder text ("Lorem ipsum", "User 1", "$1000") breaks immersion instantly. Spend the time seeding realistic data.

### Focused Scope
Don't try to demo everything. Pick the 1–3 flows that best illustrate the recommendation's value. Everything else can be a "greyed-out" button or a slide explaining future phases.

### Speed and Polish Over Features
A beautiful, fast 3-screen demo beats a laggy, buggy 10-screen demo every time. Prioritize visual polish and smooth interactions above feature breadth.

---

## Technical Approach: What to Build and How

### Default Stack (Recommended for Case Comps)

**For most demos — React + Tailwind in a single file:**
- Fast to build, easy to iterate, no setup overhead
- Can be deployed in minutes via Vercel, Netlify, or GitHub Pages
- Works offline if needed (critical for competition day reliability)
- Looks professional with minimal effort

**Charting:** Recharts (already available in Claude artifacts, no install needed)
**Icons:** Lucide React (clean, consistent icon set)
**UI Components:** Tailwind utility classes + shadcn/ui if needed

**For data-heavy dashboards:** React + Recharts is ideal
**For mobile-first concepts:** Responsive Tailwind with mobile viewport simulation
**For AI-powered demos:** Claude API integration via Anthropic artifacts (see AI Demo section)

### When NOT to Build Custom
If time is extremely short (under 30 minutes), consider:
- A high-fidelity Figma mockup walked through live
- A slide deck that simulates a UI flow (each slide = one screen)
- A pre-recorded screen recording with voiceover

Custom code is worth it if you have 1+ hours and someone comfortable enough to debug quickly.

---

## Development Workflow

### Phase 1: Design Before You Code (10–15 min)
Before writing any code, answer:
1. **What are the 2–3 screens we need?** Map them on paper or whiteboard.
2. **What is the single most important interaction?** (the demo's highlight moment)
3. **What data do we need?** Write out the fake dataset you'll use — realistic names, values, categories.
4. **What's the color palette / branding?** Match the company's actual brand colors if possible — judges notice.

### Phase 2: Scaffold the App (15–20 min)
- Set up navigation/routing first (even if simple tab-switching)
- Build the layout shell: sidebar, header, main content area
- Add placeholder content for each screen before detailing any single screen
- This ensures you have *something* for every screen even if you run out of time

### Phase 3: Build the Hero Screens (20–30 min)
- Prioritize the 1–2 screens that carry the demo's core argument
- Add realistic data, not placeholders
- Polish interactions: hover states, smooth transitions, loading states if appropriate

### Phase 4: Connect the Flow (10 min)
- Make sure navigation between screens works smoothly
- Add any click interactions that make it feel "real"
- Remove or disable anything that's broken — it's better to have fewer features than broken ones

### Phase 5: Presentation Prep (5–10 min)
- Test the demo on the presentation machine/browser
- Set up starting state (which screen to open on, what's pre-filled)
- Practice the demo walkthrough — narrate what you're doing and why it matters

---

## UI/UX Best Practices for Case Demos

### Layout Principles
- **Sidebar navigation** for multi-section apps (feels enterprise/professional)
- **Card-based layouts** for dashboards (easy to scan, impressive visual density)
- **Top-of-page KPI row** (3–4 key metrics) to immediately communicate business value
- **Consistent 8px spacing grid** — Tailwind's default spacing works perfectly

### Visual Design
- Use the company's real brand colors (primary + neutral + accent)
- Dark sidebar with light main content = professional/enterprise feel
- Light mode with strong typographic hierarchy = clean/modern feel
- Always include a company logo or wordmark (even a simple text logo beats nothing)

### Data Visualization Guidelines
- **Line chart:** trends over time (revenue, users, performance)
- **Bar chart:** comparisons between categories
- **Donut/pie chart:** composition (use sparingly, max 5 segments)
- **Table with badges/status indicators:** operational data, lists of items
- **Map:** geographic distribution (use Leaflet or a static SVG map)
- Label charts clearly — judges won't ask questions, they'll just move on if they can't read it

### Interaction Design
- Every button should do *something* — even if it's just a toast notification saying "Feature coming soon"
- Use hover states (Tailwind `hover:` classes) so the app feels alive
- Smooth transitions (`transition-all duration-200`) make everything feel polished
- Include at least one satisfying click moment (a form submit that shows a success state, a filter that updates a chart)

### Common Case Demo Screens

**Dashboard / Home:**
- KPI cards at top (4 metrics with trend arrows)
- Main chart (line or bar showing key trend)
- Recent activity table or alerts list

**AI/Recommendation Feature:**
- Input form + "Analyze" or "Generate" button
- Loading state (spinner or skeleton)
- Results panel with structured output

**Map / Geographic View:**
- Interactive markers with popups
- Legend with color-coded categories
- Summary stats in a side panel

**Process / Workflow View:**
- Step-by-step progress indicator
- Status indicators for each stage
- Action buttons to "advance" the workflow

**Customer / User Profile:**
- Header with avatar, name, key attributes
- Tabs for different data categories
- Activity timeline or history list

---

## AI-Powered Demo Techniques

If the recommendation involves AI, make the demo actually *use* AI — it's far more impressive than simulating it.

### Using Claude API in Artifacts
Claude artifacts can call the Anthropic API directly. Use this for:
- **Generative AI features:** document summarization, recommendation generation, chatbot interfaces
- **Dynamic analysis:** upload a CSV and get AI-generated insights
- **Conversational interfaces:** customer service bots, internal Q&A tools

**Pattern:**
```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: "You are a [role relevant to the case]. [Persona instructions.]",
    messages: [{ role: "user", content: userInput }]
  })
});
```

**Tips for AI demos:**
- Pre-craft 2–3 demo inputs that you know will produce great outputs — don't wing it live
- Set a strong system prompt that keeps the AI in character for the use case
- Add a loading indicator (judges know AI takes a moment — it actually feels more real)
- Display the response with formatting (use markdown rendering if responses are structured)

---

## Case Competition-Specific Considerations

### Offline Reliability
Competition venues often have spotty WiFi. If your demo needs internet:
- Test on hotspot ahead of time
- Have a fallback: a screen recording of the demo, or pre-cached responses
- For AI demos: have 2–3 responses pre-saved to display if API calls fail

### Demo as Presentation Aid, Not Replacement
The demo should complement your slides, not replace them. Common patterns:
- **Sandwich approach:** slides → live demo → slides (explain → show → conclude)
- **Embedded moment:** pause mid-presentation to demo a single key feature, then return to slides
- **Appendix demo:** full deck presented, then offer to show the demo during Q&A

### Q&A Preparation for Demos
Judges will ask:
- "How long did this take to build?" (Be honest — "We built this prototype in [X hours] for the competition. A production version would take [Y] weeks with [Z] team.")
- "What would the real implementation look like?" (Scale, infrastructure, integrations — answer from the tech-evaluator skill)
- "Can you show me [feature you didn't build]?" (Have a plan: "That would be Phase 2 — the core workflow we're showing today is the MVP.")

### Branding the Demo
- Match the company's color palette (look up their brand guidelines or just sample from their website)
- Use their actual product names, not generic terms
- Include the company logo in the nav or header
- Name the demo product convincingly ("Introducing [CompanyName] Insight" is better than "Dashboard App")

---

## Code Quality Guidelines for Demos

These aren't production apps, but messy code slows you down when you need to iterate fast.

**Do:**
- Use meaningful variable names even under time pressure (saves debugging time)
- Keep data in a single `const DATA = { ... }` object at the top of the file (easy to update)
- Use Tailwind classes consistently (pick one spacing/color scale and stick to it)
- Comment the "magic numbers" in your fake data so you can update them quickly

**Don't:**
- Don't use inline styles if Tailwind classes exist for it
- Don't build real authentication or backend persistence — fake it in React state
- Don't import large libraries for things Tailwind or basic JS can do
- Don't leave console errors in — judges who are developers will notice

---

## Quick Reference: Demo Patterns by Case Type

| Case Type | Key Screens | Hero Interaction |
|-----------|-------------|------------------|
| **Retail / E-commerce** | Personalized homepage, product recommendations, checkout | AI personalization showing "because you bought X" logic |
| **Healthcare** | Patient dashboard, clinical decision support, scheduling | AI triage or risk flagging on a patient record |
| **Supply Chain / Logistics** | Route map, inventory dashboard, alert center | Real-time anomaly alert with recommended action |
| **Financial Services** | Portfolio dashboard, fraud alerts, customer profile | Transaction risk scoring with explanation |
| **HR / Workforce** | Employee portal, skills gap analysis, learning path | AI-matched training recommendations |
| **Manufacturing** | Equipment monitoring, predictive maintenance, OEE dashboard | Failure prediction alert with maintenance scheduling |
| **Customer Experience** | Support chat, sentiment dashboard, ticket routing | AI chatbot resolving a customer issue end-to-end |

---

## How to Use This Skill

When a user wants to build a case competition demo:

1. **Clarify scope:** What is the recommendation, and what 2–3 screens would best demonstrate it?
2. **Choose the stack:** Default to React + Tailwind + Recharts unless there's a specific reason not to.
3. **Design the data:** Define realistic fake data before writing any UI code.
4. **Build iteratively:** Scaffold all screens first, then polish the hero screens.
5. **Add the "aha moment":** Identify the single most impressive interaction and make sure it's smooth.
6. **Presentation-harden:** Test offline, set the starting state, practice the narration.
7. **Prep Q&A answers:** Know how to answer "how long did this take" and "what's the real implementation."

Connect with the **tech-evaluator** skill to frame the technical architecture behind the demo, and the **slide-maker** skill to integrate the demo into the overall deck flow.
