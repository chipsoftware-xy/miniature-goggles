# XYZ Display Website (React + Vite + Tailwind)

## Run locally
    npm install
    npm run dev      # http://localhost:5173
    npm run build    # production build in /dist

## Customise
- `src/config.js`: WhatsApp number, mobile number, email, address, map embed, image helper.
- `src/data.js`: products, industries, blog posts, FAQs.
- Replace placeholder images by changing `img()` in `config.js` or using real URLs.

## Notes
- The enquiry form validates on the frontend only. Connect a backend or email service (Formspree, EmailJS, your API) in `src/components/QuoteForm.jsx`.
- For hosting, route all paths to `index.html` (SPA fallback).
- All specifications, copy and dates are placeholders. Add only verified company facts.
