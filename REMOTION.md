# GrowTogether Demo Video Project

To render the Remotion video on your Windows machine:

## Quick Start

1. **Install Node.js 20+** from https://nodejs.org

2. **Clone and setup:**
```bash
git clone https://github.com/tvds04/TGA-demo.git
cd TGA-demo
npm install
```

3. **Start the demo app:**
```bash
npm run dev
```

4. **In a new terminal, render the video:**
```bash
npx remotion render index.jsx TGAComposition out/video.mp4
```

## Files
- `src/` - React app source
- `screenshots/` - Captured app screens
- `index.jsx` - Remotion entry point
- `src/Composition.jsx` - Video## The Issue composition


Remotion had Node.js native module issues on this Mac (gl/canvas). Should work on fresh Windows install.

## Screenshots already captured:
- onboarding1-5.png (onboarding flow)
- home.png, community.png, insights.png, education.png, profile.png
