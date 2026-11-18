# KalpLabs Display Website (React + Vite + Tailwind)

## Run locally
    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in /dist

## What's interactive
- **Hero LED wall** (`components/LedWall.jsx`): live canvas of LED dots. Cursor lights pixels, click sends a ripple, buttons change pixel pitch.
- **Tech lens** (`components/TechLens.jsx`): SMD / COB / GOB macro views.
- **Brightness simulator** (`components/BrightnessSim.jsx`): indoor vs outdoor screen readability as ambient light rises.
- **Screen calculator** (`components/PitchCalculator.jsx`, page `/calculator`): resolution, cabinets, viewing distance; sends results to WhatsApp.
- **India LED map** (`components/IndiaMap.jsx`): offices with addresses and directions.
- **Animated product screens** (`components/ScreenVisual.jsx`): CSS "screens" in place of stock photos. Pass `photo="/images/x.jpg"` to use a real photo.

## Customise
- `src/config.js`: phone, WhatsApp, email, offices, social links.
- `src/data.js`: products (incl. `specs` – fill from the catalogue PDF), industries, posts, FAQs.
- Enquiry form opens WhatsApp or email with the details filled in. To receive submissions automatically, connect Formspree/EmailJS/your API in `src/components/QuoteForm.jsx`.
- For hosting, route all paths to `index.html` (SPA fallback).
