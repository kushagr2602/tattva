"use client";

import { useState } from "react";
import { categories } from "@/lib/products";

type Fields = { name: string; category: string; blurb: string; reuse: string; fit: "cover" | "contain" };
const EMPTY: Fields = { name: "", category: "", blurb: "", reuse: "", fit: "cover" };

// Shrink the photo in the browser so uploads stay small and load fast on the site.
async function resize(file: File, max = 1400, quality = 0.85): Promise<string> {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
  return canvas.toDataURL("image/jpeg", quality); // data:image/jpeg;base64,....
}

export default function Admin() {
  const [password, setPassword] = useState("");
  const [preview, setPreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [status, setStatus] = useState<"idle" | "analyzing" | "publishing" | "done">("idle");
  const [error, setError] = useState("");
  const [publishedId, setPublishedId] = useState("");

  const set = (k: keyof Fields, v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const dataUrl = await resize(file);
    setPreview(dataUrl);
    setImageBase64(dataUrl.split(",")[1]);
    setPublishedId("");
    setStatus("idle");
  }

  async function post(url: string, body: unknown) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || `Request failed (${r.status})`);
    return data;
  }

  async function analyze() {
    if (!imageBase64) return setError("Please choose a photo first.");
    if (!password) return setError("Please enter the password.");
    setError(""); setStatus("analyzing");
    try {
      const s = await post("/api/analyze", { password, imageBase64, mediaType: "image/jpeg" });
      setFields({ name: s.name || "", category: s.category || "", blurb: s.blurb || "", reuse: s.reuse || "", fit: s.fit || "cover" });
      setStatus("idle");
    } catch (e) {
      setStatus("idle"); setError(e instanceof Error ? e.message : "Could not analyze the photo.");
    }
  }

  async function publish() {
    if (!imageBase64) return setError("Please choose a photo first.");
    if (!fields.name.trim() || !fields.category) return setError("Please add a name and a category.");
    setError(""); setStatus("publishing");
    try {
      const r = await post("/api/publish", { password, product: fields, imageBase64, mediaType: "image/jpeg" });
      setPublishedId(r.id); setStatus("done");
    } catch (e) {
      setStatus("idle"); setError(e instanceof Error ? e.message : "Could not publish.");
    }
  }

  function reset() {
    setPreview(""); setImageBase64(""); setFields(EMPTY); setStatus("idle"); setPublishedId(""); setError("");
  }

  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Tattva admin</p>
          <h1>Add a new product</h1>
          <p className="page-head-sub">
            Upload a photo, let the assistant fill in the details, edit anything, and publish. The site
            updates on its own in about a minute.
          </p>
        </div>
      </section>

      <section className="wrap enquire-wrap">
        <div className="enquire-form engraved" style={{ display: "block" }}>
          <label className="field field-wide" style={{ marginBottom: "1.25rem" }}>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" />
          </label>

          <div className="admin-grid">
            <div>
              <label className="field">
                <span>Product photo</span>
                <input type="file" accept="image/*" onChange={onFile} />
              </label>
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" className="admin-preview" />
              )}
              <button type="button" className="btn btn-ghost btn-ghost-dark" onClick={analyze}
                disabled={status === "analyzing" || !imageBase64} style={{ marginTop: "0.9rem" }}>
                {status === "analyzing" ? "Looking at the photo…" : "Analyze photo with AI"}
              </button>
            </div>

            <div className="admin-fields">
              <label className="field">
                <span>Name</span>
                <input value={fields.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Peacock Dry-Fruit Platter" />
              </label>
              <label className="field">
                <span>Category</span>
                <select value={fields.category} onChange={(e) => set("category", e.target.value)}>
                  <option value="">Choose a category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Description</span>
                <textarea rows={2} value={fields.blurb} onChange={(e) => set("blurb", e.target.value)} placeholder="One sentence about the piece" />
              </label>
              <label className="field">
                <span>Second life (how it&apos;s reused)</span>
                <textarea rows={2} value={fields.reuse} onChange={(e) => set("reuse", e.target.value)} placeholder="How it gets used again after the occasion" />
              </label>
              <label className="field">
                <span>Photo fit</span>
                <select value={fields.fit} onChange={(e) => set("fit", e.target.value)}>
                  <option value="cover">Fill the frame (landscape photos)</option>
                  <option value="contain">Show whole photo (tall / boxed photos)</option>
                </select>
              </label>
            </div>
          </div>

          {error && <p className="field-err" style={{ marginTop: "1rem" }}>{error}</p>}

          {status === "done" ? (
            <div className="admin-done">
              <p>✅ Published <strong>{fields.name}</strong> ({publishedId}). It will appear on the site in about a minute.</p>
              <button type="button" className="btn btn-primary" onClick={reset}>Add another product</button>
            </div>
          ) : (
            <div className="enquire-actions" style={{ marginTop: "1.25rem" }}>
              <button type="button" className="btn btn-primary" onClick={publish} disabled={status === "publishing"}>
                {status === "publishing" ? "Publishing…" : "Publish to the site"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
