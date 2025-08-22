# Boutique E‑Commerce (React + Vite + Tailwind)

A starter e‑commerce frontend for a boutique in Amritsar with:
- Home (hero carousel, featured)
- Collection (filters, search)
- Product Detail (wishlist, enquiry form)
- Wishlist (persisted)
- Auth (demo JWT in localStorage)
- Admin (client‑side product CRUD, persists to localStorage)
- Animations via Framer Motion
- TailwindCSS styling

> This is a **frontend-only** demo. Hook it to your Rails or Node API later.

## Quick Start
```bash
npm i
npm run dev
```

## Demo Accounts
- Admin: `admin@demo.com` / any password
- User: any email / any password

## Wire to a Real Backend Later
- Replace `AuthContext` login/signup with API calls to your backend (JWT).
- Replace admin localStorage with real product endpoints.
- Enquiry form: POST to backend or an email service (e.g. Resend, SendGrid).
- Images: Upload to S3/Cloudinary; replace `/assets/*.jpg` placeholders.

## Tech
- React + Vite
- TailwindCSS
- React Router
- Framer Motion
