// POST /api/publish — publish a new product.
// Commits the image to public/products/ and appends to content/products.json in the
// repo, which triggers a Vercel rebuild.
// Env: ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_REPO ("owner/name"), GITHUB_BRANCH (default main).
/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtime = "nodejs";

const CATEGORIES = ["Diwali", "Wedding", "Pooja", "Home & Table"];

export async function POST(req: Request) {
  const { password, product, imageBase64, mediaType } = await req.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return Response.json({ error: "Wrong password." }, { status: 401 });
  if (!product?.name || !CATEGORIES.includes(product?.category) || !imageBase64)
    return Response.json({ error: "Please provide a photo, a name and a category." }, { status: 400 });

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

  const ext = (mediaType || "").includes("png") ? "png" : (mediaType || "").includes("webp") ? "webp" : "jpg";

  try {
    // read current products.json
    const jr = await gh(`contents/content/products.json?ref=${branch}`);
    if (!jr.ok) return Response.json({ error: "Could not read the product list." }, { status: 502 });
    const jf = await jr.json();
    const list: any[] = JSON.parse(Buffer.from(jf.content, "base64").toString("utf8"));

    // unique id from the name
    const stem = String(product.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";
    const ids = new Set(list.map((p) => p.id));
    let id = stem, n = 2;
    while (ids.has(id)) id = `${stem}-${n++}`;

    // next item code: TTV-### one past the highest existing
    const maxNum = list.reduce((m: number, p: any) => {
      const v = parseInt(String(p.code || "").replace(/[^0-9]/g, ""), 10);
      return Number.isFinite(v) && v > m ? v : m;
    }, 0);
    const code = `TTV-${String(maxNum + 1).padStart(3, "0")}`;

    const imagePath = `/products/${id}.${ext}`;
    const entry: any = {
      id,
      code,
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
      return Response.json({ error: "Could not save the photo.", detail: t.slice(0, 200) }, { status: 502 });
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
      return Response.json({ error: "Could not update the product list.", detail: t.slice(0, 200) }, { status: 502 });
    }

    return Response.json({ ok: true, id, code, image: imagePath });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
