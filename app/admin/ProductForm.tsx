"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { categories, type Product } from "@/lib/products";

type Fields = { name: string; category: string; blurb: string; reuse: string; fit: "cover" | "contain" };
const EMPTY: Fields = { name: "", category: "", blurb: "", reuse: "", fit: "cover" };

// Remember the password for this browser tab only, so moving between
// dashboard / add / edit doesn't mean retyping it every time.
const PW_KEY = "tattva_admin_pw";
const readPw = () => (typeof window === "undefined" ? "" : sessionStorage.getItem(PW_KEY) || "");
const savePw = (v: string) => { if (typeof window !== "undefined") sessionStorage.setItem(PW_KEY, v); };

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

export default function ProductForm({
  mode, id, initial,
}: {
  mode: "new" | "edit";
  id?: string;
  initial?: Product;
}) {
  const router = useRouter();
  const [password, setPassword] = useState(readPw);
  const [preview, setPreview] = useState(initial?.image || "");
  const [imageBase64, setImageBase64] = useState("");
  const [fields, setFields] = useState<Fields>(
    initial
      ? { name: initial.name, category: initial.category, blurb: initial.blurb, reuse: initial.reuse, fit: initial.fit || "cover" }
      : EMPTY
  );
  const [status, setStatus] = useState<"idle" | "analyzing" | "saving" | "deleting" | "done">("idle");
  const [error, setError] = useState("");
  const [publishedCode, setPublishedCode] = useState("");

  const set = (k: keyof Fields, v: string) => setFields((f) => ({ ...f, [k]: v }));

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    const dataUrl = await resize(file);
    setPreview(dataUrl);
    setImageBase64(dataUrl.split(",")[1]);
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
    setError(""); setStatus("analyzing"); savePw(password);
    try {
      const s = await post("/api/analyze", { password, imageBase64, mediaType: "image/jpeg" });
      setFields({ name: s.name || "", category: s.category || "", blurb: s.blurb || "", reuse: s.reuse || "", fit: s.fit || "cover" });
      setStatus("idle");
    } catch (e) {
      setStatus("idle"); setError(e instanceof Error ? e.message : "Could not analyze the photo.");
    }
  }

  async function save() {
    if (mode === "new" && !imageBase64) return setError("Please choose a photo first.");
    if (!fields.name.trim() || !fields.category) return setError("Please add a name and a category.");
    if (!password) return setError("Please enter the password.");
    setError(""); setStatus("saving"); savePw(password);
    try {
      if (mode === "new") {
        const r = await post("/api/publish", { password, product: fields, imageBase64, mediaType: "image/jpeg" });
        setPublishedCode(r.code || ""); setStatus("done");
      } else {
        await post("/api/update", { password, id, product: fields, imageBase64: imageBase64 || undefined, mediaType: "image/jpeg" });
        setStatus("done");
      }
    } catch (e) {
      setStatus("idle"); setError(e instanceof Error ? e.message : "Could not save.");
    }
  }

  async function remove() {
    if (!password) return setError("Please enter the password.");
    if (!window.confirm(`Delete "${fields.name}"? This can't be undone.`)) return;
    setError(""); setStatus("deleting"); savePw(password);
    try {
      await post("/api/delete", { password, id });
      router.push("/admin");
    } catch (e) {
      setStatus("idle"); setError(e instanceof Error ? e.message : "Could not delete.");
    }
  }

  function reset() {
    setPreview(""); setImageBase64(""); setFields(EMPTY); setStatus("idle"); setPublishedCode(""); setError("");
  }

  const busy = status === "analyzing" || status === "saving" || status === "deleting";

  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">{mode === "new" ? "Add product" : "Edit product"}</p>
          <h1>{mode === "new" ? "Add a new product" : fields.name || "Edit product"}</h1>
          <p className="page-head-sub">
            {mode === "new"
              ? "Upload a photo, let the assistant fill in the details, edit anything, and publish."
              : "Update the details, replace the photo if you like, and save."}
            {" "}The site updates on its own in about a minute.
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
                <span>{mode === "edit" ? "Replace photo (optional)" : "Product photo"}</span>
                <input type="file" accept="image/*" onChange={onFile} />
              </label>
              {preview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" className="admin-preview" />
              )}
              <button type="button" className="btn btn-ghost btn-ghost-dark" onClick={analyze}
                disabled={busy || !imageBase64} style={{ marginTop: "0.9rem" }}>
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
              <p>
                ✅ {mode === "new"
                  ? <>Published <strong>{fields.name}</strong> as item code <strong>{publishedCode}</strong>.</>
                  : <>Saved changes to <strong>{fields.name}</strong>.</>}
                {" "}It will appear on the site in about a minute.
              </p>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {mode === "new" && <button type="button" className="btn btn-primary" onClick={reset}>Add another product</button>}
                <button type="button" className="btn btn-ghost btn-ghost-dark" onClick={() => router.push("/admin")}>Back to dashboard</button>
              </div>
            </div>
          ) : (
            <div className="enquire-actions" style={{ marginTop: "1.25rem", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "0.9rem" }}>
                <button type="button" className="btn btn-primary" onClick={save} disabled={busy}>
                  {status === "saving" ? "Saving…" : mode === "new" ? "Publish to the site" : "Save changes"}
                </button>
              </div>
              {mode === "edit" && (
                <button type="button" className="btn btn-ghost admin-danger" onClick={remove} disabled={busy}>
                  {status === "deleting" ? "Deleting…" : "Delete product"}
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
