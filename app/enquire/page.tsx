"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const OCCASIONS = ["Wedding", "Diwali / Festive", "Rakhi", "Housewarming", "Anniversary", "Naming ceremony", "Corporate / Bulk", "Other"];

// "2026-11-05" -> "5 Nov 2026" (built locally to avoid timezone shifts)
function prettyDate(v: string) {
  if (!v) return "";
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
const BUDGETS = ["Not sure yet", "Under ₹1,000 each", "₹1,000–3,000 each", "₹3,000–5,000 each", "Above ₹5,000 each"];

export default function Enquire() {
  const [item, setItem] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [quantity, setQuantity] = useState("");
  const [budget, setBudget] = useState("");
  const [byDate, setByDate] = useState("");
  const [storyCard, setStoryCard] = useState(true);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState("");

  // Prefill the item when arriving from a product page (?item=&url=).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("item")) setItem(q.get("item")!);
    if (q.get("url")) setProductUrl(q.get("url")!);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !occasion) {
      setErr("Please add your name and the occasion so we can help.");
      return;
    }
    const details = [
      `👤  *Name:*  ${name.trim()}`,
      `🎊  *Occasion:*  ${occasion}`,
      item.trim() && `🎁  *Pieces I like:*  ${item.trim()}`,
      quantity.trim() && `🔢  *Quantity:*  ${quantity.trim()}`,
      budget && `💰  *Budget:*  ${budget}`,
      byDate && `📅  *Needed by:*  ${prettyDate(byDate)}`,
      `✍️  *Handwritten story card:*  ${storyCard ? "Yes, please" : "No"}`,
      notes.trim() && `📝  *Notes:*  ${notes.trim()}`,
    ].filter((l): l is string => Boolean(l));

    const parts = [`Hello ${site.brand} 🌸`, "", "I'd like to make a gifting enquiry:", "", details.join("\n")];
    if (productUrl) parts.push("", `🔗  ${productUrl}`);
    parts.push("", "Thank you! 🙏");

    const text = encodeURIComponent(parts.join("\n"));
    window.location.href = `https://wa.me/${site.whatsapp}?text=${text}`;
  }

  return (
    <>
      <section className="page-head on-dark">
        <div className="wrap">
          <p className="eyebrow">Private gifting desk</p>
          <h1>Tell us about the gift</h1>
          <p className="page-head-sub">
            A few quick questions so Manisha can put together the right pieces for you. Your answers
            open a ready-to-send WhatsApp message, nothing is charged and nothing is final.
          </p>
        </div>
      </section>

      <section className="wrap enquire-wrap">
        <form className="enquire-form engraved" onSubmit={submit}>
          <label className="field">
            <span>Your name<i>*</i></span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
          </label>

          <label className="field">
            <span>Occasion<i>*</i></span>
            <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
              <option value="">Choose an occasion</option>
              {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>

          <label className="field field-wide">
            <span>Pieces you like</span>
            <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="e.g. Peacock Heritage Gift Box, or describe what you have in mind" />
          </label>

          <label className="field">
            <span>Quantity</span>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g. 25 gifts" />
          </label>

          <label className="field">
            <span>Budget per gift</span>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">Choose a range (optional)</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <label className="field">
            <span>Needed by</span>
            <input type="date" value={byDate} onChange={(e) => setByDate(e.target.value)} />
          </label>

          <label className="field field-check">
            <input type="checkbox" checked={storyCard} onChange={(e) => setStoryCard(e.target.checked)} />
            <span>Include a handwritten story card from Manisha</span>
          </label>

          <label className="field field-wide">
            <span>Anything else</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Names to engrave, colours, delivery city, or anything that helps" />
          </label>

          {err && <p className="field-err">{err}</p>}

          <div className="field-wide enquire-actions">
            <button type="submit" className="btn btn-primary">Send enquiry on WhatsApp</button>
            <Link href="/catalogue" className="btn btn-ghost btn-ghost-dark">Back to catalogue</Link>
          </div>
          <p className="enquire-note field-wide">
            This opens WhatsApp with your answers filled in. You still tap send, and you can edit first.
            Prefer email? Write to <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </form>
      </section>
    </>
  );
}
