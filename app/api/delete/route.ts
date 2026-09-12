// POST /api/delete — remove a product from the catalogue.
// Env: ADMIN_PASSWORD, GITHUB_TOKEN, GITHUB_REPO, GITHUB_BRANCH.
/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { password, id } = await req.json().catch(() => ({}));

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD)
    return Response.json({ error: "Wrong password." }, { status: 401 });
  if (!id) return Response.json({ error: "No product specified." }, { status: 400 });

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
    const remaining = list.filter((p) => p.id !== id);

    const newContent = Buffer.from(JSON.stringify(remaining, null, 2) + "\n", "utf8").toString("base64");
    const ur = await gh(`contents/content/products.json`, {
      method: "PUT",
      body: JSON.stringify({ message: `Remove product: ${id}`, content: newContent, sha: jf.sha, branch }),
    });
    if (!ur.ok) {
      const t = await ur.text();
      return Response.json({ error: "Could not remove the product.", detail: t.slice(0, 200) }, { status: 502 });
    }

    // Best-effort: also delete the photo. Not fatal if it fails (e.g. already gone).
    if (entry.image) {
      const fr = await gh(`contents/public${entry.image}?ref=${branch}`);
      if (fr.ok) {
        const ff = await fr.json();
        await gh(`contents/public${entry.image}`, {
          method: "DELETE",
          body: JSON.stringify({ message: `Remove product image: ${id}`, sha: ff.sha, branch }),
        }).catch(() => {});
      }
    }

    return Response.json({ ok: true, id });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
