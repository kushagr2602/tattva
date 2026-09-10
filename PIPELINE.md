# Add-a-product pipeline (the `/admin` page)

Manisha uploads a photo, the AI fills in the details, she edits and hits Publish,
and the product appears on the site. No coding, no spreadsheet.

## How it works
- **`/admin`** — a private page (password protected). Upload photo → "Analyze photo with AI"
  → review/edit the name, category, description, second-life → "Publish".
- **`/api/analyze`** — Next.js route handler; sends the photo to OpenAI, which suggests the fields.
- **`/api/publish`** — commits the photo to `public/products/` and adds the item to
  `content/products.json` in this repo. That commit auto-rebuilds and redeploys on Vercel.

The public catalogue reads `content/products.json`, so publishing just adds a row there.

## Hosting
The site runs on **Vercel** (free Hobby plan) at **tattvastories.com**. Every push to
`main` auto-deploys. GitHub Pages is retired.

## Environment variables (set once, in Vercel → Project → Settings → Environment Variables)
From [`.env.example`](.env.example), all scoped to **Production**:

| Key | Value |
|-----|-------|
| `OPENAI_API_KEY` | your OpenAI key (platform.openai.com → API keys) |
| `OPENAI_MODEL` | `gpt-4o-mini` (cheap, supports vision) |
| `ADMIN_PASSWORD` | a strong password Manisha types in `/admin` |
| `GITHUB_TOKEN` | a **fine-grained** GitHub token with **Contents: Read and write** on `kushagr2602/tattva` |
| `GITHUB_REPO` | `kushagr2602/tattva` |
| `GITHUB_BRANCH` | `main` |

After adding them, redeploy (Vercel → Deployments → ⋯ → Redeploy) so the functions pick them up.

## Using it
1. Open `https://tattvastories.com/admin`, enter the password.
2. Choose a product photo → **Analyze photo with AI** → check the fields.
3. **Publish to the site.** It commits and the site updates in about a minute.

## Notes
- Photos are shrunk in the browser before upload, so they load fast and stay small.
- Every publish is a normal git commit — easy to see, edit, or undo.
- If the "Analyze" step ever misfires, Manisha can just type the fields herself and Publish.
- Item codes (`TTV-###`) are assigned automatically, one past the current highest.
- Model cost is a fraction of a cent per photo on `gpt-4o-mini`.
