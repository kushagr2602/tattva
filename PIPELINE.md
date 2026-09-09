# Add-a-product pipeline (the `/admin` page)

Your mom uploads a photo, the AI fills in the details, she edits and hits Publish,
and the product appears on the site. No coding, no spreadsheet.

## How it works
- **`/admin`** — a private page (password protected). Upload photo → "Analyze photo with AI"
  → review/edit the name, category, description, second-life → "Publish".
- **`/api/analyze`** — sends the photo to OpenAI, which suggests the fields.
- **`/api/publish`** — commits the photo to `public/products/` and adds the item to
  `content/products.json` in this repo. That commit rebuilds and redeploys the site.

The public catalogue reads `content/products.json`, so publishing just adds a row there.

## What you need to turn it on (do this once, after you host on Vercel)
GitHub Pages can't run the `/api` functions, so the admin only works on a host that can
(Vercel or Netlify). Steps:

1. **Deploy this repo to Vercel** (Import the GitHub repo at vercel.com/new → Deploy).
   The public site keeps working on GitHub Pages too; Vercel just adds the admin + API.
2. **Point your domain** at the Vercel deployment (Vercel → Project → Domains).
3. In **Vercel → Project → Settings → Environment Variables**, add the values from
   [`.env.example`](.env.example):
   - `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`)
   - `ADMIN_PASSWORD` — the password your mom will type
   - `GITHUB_TOKEN` — a fine-grained GitHub token with **Contents: Read and write** on this repo
   - `GITHUB_REPO` (`kushagr2602/tattva`) and `GITHUB_BRANCH` (`main`)
4. Redeploy. Then open `https://your-domain/admin`, enter the password, and try a photo.

## Notes
- Photos are shrunk in the browser before upload, so they load fast and stay small.
- Every publish is a normal git commit — easy to see, edit, or undo.
- If the "Analyze" step ever misfires, she can just type the fields herself and Publish.
- Model cost is a fraction of a cent per photo on `gpt-4o-mini`.
- If Vercel doesn't pick up the `/api` folder for this Next.js project, move the two files
  in `/api` to `app/api/analyze/route.ts` and `app/api/publish/route.ts` (route-handler form)
  — they're plain functions and port over easily.
