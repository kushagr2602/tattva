# Silver Gifts — German silver gifting catalogue

A catalogue site (no prices, no cart). Customers browse, then enquire on WhatsApp/email.

## Edit the two things that matter

- **Business details** — name, WhatsApp number, email, Instagram: `lib/site.ts`
- **Products** — add/remove/reword items: `lib/products.ts`

### Adding a real photo to a product
1. Drop the image in `public/products/` (e.g. `public/products/urli.jpg`).
2. In `lib/products.ts`, set that product's `image: "/products/urli.jpg"`.
   Until you do, a styled engraved plate shows in its place — the site still looks finished.

## Run it locally
```bash
npm install
npm run dev        # open http://localhost:3000
```

## Put it online (free)
```bash
npm run build
```
Then deploy to **Vercel** (easiest for Next.js: push to GitHub → import at vercel.com)
or Netlify. Both have free tiers.
