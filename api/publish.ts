// Vercel serverless function: publish a new product.
// Commits the image + appends to content/products.json in the repo, which triggers
// a rebuild. Env: ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_REPO ("owner/name"), GITHUB_BRANCH (default main).
/* eslint-disable @typescript-eslint/no-explicit-any */

const CATEGORIES = ["Diwali", "Wedding", "Pooja", "Home & Table"];

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  const { password, product, imageBase64, mediaType } = req.body || {};
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: "Wrong password." });
  if (!product?.name || !CATEGORIES.includes(product?.category) || !imageBase64)
    return res.status(400).json({ error: "Please provide a photo, a name and a category." });

  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) return res.status(500).json({ error: "GitHub is not configured." });

  const gh = (path: string, opts: any = {}) =>
    fetch(`https://api.github.com/repos/${repo}/${path}`, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "tattva-admin",
        ...(opts.headers || {}),
      },
    });

  const ext = (mediaType || "").includes("png") ? "png" : (mediaType || "").includes("webp") ? "webp" : "jpg";

  try {
    // read current products.json
    const jr = await gh(`contents/content/products.json?ref=${branch}`);
    if (!jr.ok) return res.status(502).json({ error: "Could not read the product list." });
    const jf = await jr.json();
    const list: any[] = JSON.parse(Buffer.from(jf.content, "base64").toString("utf8"));

    // unique id from the name
    const base = String(product.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
    const ids = new Set(list.map((p) => p.id));
    let id = base, n = 2;
    while (ids.has(id)) id = `${base}-${n++}`;

    const imagePath = `/products/${id}.${ext}`;
    const entry: any = {
      id,
      name: product.name,
      category: product.category,
      blurb: product.blurb || "",
      reuse: product.reuse || "",
      image: imagePath,
    };
    if (product.fit === "contain") entry.fit = "contain";

    // 1) commit the image first (so the entry never points at a missing file)
    const ir = await gh(`contents/public/products/${id}.${ext}`, {
      method: "PUT",
      body: JSON.stringify({ message: `Add product image: ${id}`, content: imageBase64, branch }),
    });
    if (!ir.ok) {
      const t = await ir.text();
      return res.status(502).json({ error: "Could not save the photo.", detail: t.slice(0, 200) });
    }

    // 2) append to products.json
    list.push(entry);
    const newContent = Buffer.from(JSON.stringify(list, null, 2) + "\n", "utf8").toString("base64");
    const ur = await gh(`contents/content/products.json`, {
      method: "PUT",
      body: JSON.stringify({ message: `Add product: ${id}`, content: newContent, sha: jf.sha, branch }),
    });
    if (!ur.ok) {
      const t = await ur.text();
      return res.status(502).json({ error: "Could not update the product list.", detail: t.slice(0, 200) });
    }

    return res.status(200).json({ ok: true, id, image: imagePath });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
