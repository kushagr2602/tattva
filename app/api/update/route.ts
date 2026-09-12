// POST /api/update — edit an existing product's fields, and optionally replace its photo.
// Env: ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH.
/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtime = "nodejs";

const CATEGORIES = ["Diwali", "Wedding", "Pooja", "Home & Table"];

export async function POST(req: Request) {
  const { password, id, product, imageBase64, mediaType } = await req.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return Response.json({ error: "Wrong password." }, { status: 401 });
  if (!id || !product?.name || !CATEGORIES.includes(product?.category))
    return Response.json({ error: "Please provide a name and a category." }, { status: 400 });

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) return Response.json({ error: "GitHub is not configured." }, { status: 500 });

  const gh = (p: string, opts: RequestInit = {}) =>
    fetch(`https://api.github.com/repos/${repo}/${p}`, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "tattva-admin",
        ...(opts.headers || {}),
      },
    });

  try {
    const jr = await gh(`contents/content/products.json?ref=${branch}`);
    if (!jr.ok) return Response.json({ error: "Could not read the product list." }, { status: 502 });
    const jf = await jr.json();
    const list: any[] = JSON.parse(Buffer.from(jf.content, "base64").toString("utf8"));

    const entry = list.find((p) => p.id === id);
    if (!entry) return Response.json({ error: "Product not found." }, { status: 404 });

    entry.name = product.name;
    entry.category = product.category;
    entry.blurb = product.blurb || "";
    entry.reuse = product.reuse || "";
    if (product.fit === "contain") entry.fit = "contain";
    else delete entry.fit;

    // Replace the photo, if a new one was uploaded.
    if (imageBase64) {
      const ext = (mediaType || "").includes("png") ? "png" : (mediaType || "").includes("webp") ? "webp" : "jpg";
      const newPath = `/products/${id}.${ext}`;
      const body: any = { message: `Update product image: ${id}`, content: imageBase64, branch };
      // If a file already exists at this exact path (same extension as before), overwrite it — needs its sha.
      const existing = await gh(`contents/public${newPath}?ref=${branch}`);
      if (existing.ok) body.sha = (await existing.json()).sha;
      const ir = await gh(`contents/public${newPath}`, { method: "PUT", body: JSON.stringify(body) });
      if (!ir.ok) {
        const t = await ir.text();
        return Response.json({ error: "Could not save the photo.", detail: t.slice(0, 200) }, { status: 502 });
      }
      // ponytail: if the extension changed (e.g. .png -> .jpg), the old file is left in place,
      // orphaned but harmless — fine for a catalogue this size.
      entry.image = newPath;
    }

    const newContent = Buffer.from(JSON.stringify(list, null, 2) + "\n", "utf8").toString("base64");
    const ur = await gh(`contents/content/products.json`, {
      method: "PUT",
      body: JSON.stringify({ message: `Update product: ${id}`, content: newContent, sha: jf.sha, branch }),
    });
    if (!ur.ok) {
      const t = await ur.text();
      return Response.json({ error: "Could not save the changes.", detail: t.slice(0, 200) }, { status: 502 });
    }

    return Response.json({ ok: true, id, image: entry.image });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
